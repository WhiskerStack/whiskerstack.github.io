// Datos de contacto y metadatos del sitio.
// TODO: reemplaza los valores marcados antes de publicar.
export const site = {
  name: "WhiskerStack",
  url: "https://whiskerstack.github.io",
  description:
    "Catálogos, menús, sitios informativos y anuncios hechos solo con HTML, CSS y JavaScript. Rápidos, baratos de mantener y sin servidor que se caiga.",
  contact: {
    whatsapp: "00000000000", // TODO: número en formato internacional, solo dígitos
    telegram: "whiskerstack", // TODO: usuario de Telegram sin @
    email: "hola@whiskerstack.example", // TODO
  },
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
