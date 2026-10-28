// Genera las capturas de los trabajos en src/assets/projects/<slug>.png
//
// Uso (una sola vez):  npm i -D playwright && npx playwright install chromium
// Luego:               npm run capture            (todas)
//                      npm run capture -- lacaja  (solo una)
import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";

const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));

const only = process.argv.slice(2);
const list = only.length ? projects.filter((p) => only.includes(p.slug)) : projects;
await mkdir("src/assets/projects", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const p of list) {
  const url = p.url.replace(/\/$/, "") + "/" + (p.capture?.path ?? "").replace(/^\//, "");
  process.stdout.write(`${p.slug} … `);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    if (p.capture?.blurMedia) {
      await page.addStyleTag({
        content: `img, video, picture, [style*="background-image"] { filter: blur(18px) saturate(.9) !important; }`,
      });
    }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `src/assets/projects/${p.slug}.png` });
    console.log("ok");
  } catch (e) {
    console.log("error:", e.message.split("\n")[0]);
  }
}
await browser.close();
