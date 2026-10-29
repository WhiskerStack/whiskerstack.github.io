// Genera las capturas de los trabajos en src/assets/projects/<slug>.png
//
// Uso (una sola vez):  npm i -D playwright && npx playwright install chromium
// Luego:
//   npm run capture                          (todas)
//   npm run capture -- lacaja                (una)
//   npm run capture -- lacaja otracosa       (varias)
//   npm run capture -- --help                (ayuda)
import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";

const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
const available = new Set(projects.map((p) => p.slug));

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Uso: npm run capture [-- <slug>...]

  (sin argumentos)     Captura todos los proyectos
  <slug> [<slug>...]   Captura solo los slugs indicados

Slugs disponibles:
  ${[...available].join("\n  ")}
`);
  process.exit(0);
}

// Validar que los slugs pedidos existan
const missing = args.filter((s) => !available.has(s));
if (missing.length) {
  console.error(`❌ Slug(s) no encontrado(s): ${missing.join(", ")}`);
  console.error(`   Disponibles: ${[...available].join(", ")}`);
  process.exit(1);
}

const list = args.length
  ? projects.filter((p) => args.includes(p.slug))
  : projects;

await mkdir("src/assets/projects", { recursive: true });

console.log(
  `📸 Capturando ${list.length} proyecto(s): ${list.map((p) => p.slug).join(", ")}\n`
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

let ok = 0;
let fail = 0;

for (const p of list) {
  const url =
    p.url.replace(/\/$/, "") +
    "/" +
    (p.capture?.path ?? "").replace(/^\//, "");

  process.stdout.write(`  ${p.slug} … `);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    if (p.capture?.blurMedia) {
      await page.addStyleTag({
        content: `img, video, picture, [style*="background-image"] { filter: blur(18px) saturate(.9) !important; }`,
      });
    }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `src/assets/projects/${p.slug}.png` });
    console.log("✅");
    ok++;
  } catch (e) {
    console.log("❌ " + e.message.split("\n")[0]);
    fail++;
  }
}

await browser.close();

console.log(`\n✅ ${ok} ok · ❌ ${fail} error(es)`);
if (fail) process.exit(1);