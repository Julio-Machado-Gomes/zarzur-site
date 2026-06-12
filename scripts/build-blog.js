import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import matter from "gray-matter";

const BASE = "https://www.zarzurgarantidora.com.br";
const CONTENT = "content/blog";
const OUT = "dist/blog";
const WA = "https://wa.me/5527999734394?text=" + encodeURIComponent("Olá! Vim pelo blog da ZARZUR e quero falar com um especialista.");

const fmtDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

function head({ title, description, canonical, image, jsonld }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="ZARZUR Soluções Financeiras">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="theme-color" content="#044828">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/lp/lp.css">
<link rel="stylesheet" href="/blog.css">
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ""}
</head>
<body>`;
}

const topbar = `<header class="lp-topbar"><div class="zzc-container lp-topbar-row">
<a href="/" aria-label="ZARZUR"><img class="lp-topbar-logo" src="/assets/marca-horizontal-white.svg" alt="ZARZUR"></a>
<div style="display:flex;align-items:center;gap:24px">
<a class="lp-topbar-back" href="/blog"><i data-lucide="newspaper"></i> Blog</a>
<a class="lp-topbar-wa" href="${WA}" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> WhatsApp</a>
</div></div></header>`;

const footer = `<footer class="blog-footer"><div class="zzc-container">
© 2026 ZARZUR Soluções Financeiras · CNPJ 62.716.775/0001-15 · <a href="/">zarzurgarantidora.com.br</a>
</div></footer>
<script>lucide.createIcons();</script>
</body></html>`;

// ---- coleta e ordena posts ----
const files = fs.existsSync(CONTENT) ? fs.readdirSync(CONTENT).filter((f) => f.endsWith(".md")) : [];
const posts = files
  .map((f) => {
    const raw = fs.readFileSync(path.join(CONTENT, f), "utf-8");
    const { data, content } = matter(raw);
    return { ...data, html: marked.parse(content) };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.mkdirSync(OUT, { recursive: true });

// ---- páginas de artigo ----
for (const p of posts) {
  const canonical = `${BASE}/blog/${p.slug}`;
  const image = p.cover ? (p.cover.startsWith("http") ? p.cover : BASE + p.cover) : `${BASE}/assets/marca-horizontal.png`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Organization", name: "ZARZUR Soluções Financeiras" },
    publisher: {
      "@type": "Organization",
      name: "ZARZUR Soluções Financeiras",
      logo: { "@type": "ImageObject", url: `${BASE}/assets/marca-horizontal.png` },
    },
    mainEntityOfPage: canonical,
    image,
  });
  const page =
    head({ title: `${p.title} | Blog ZARZUR`, description: p.description, canonical, image, jsonld }) +
    topbar +
    `<article class="blog-article"><div class="blog-wrap">
<div class="meta">${fmtDate(p.date)} · ${p.author || "ZARZUR"}</div>
<h1>${p.title}</h1>
<div class="blog-body">${p.html}</div>
<div class="blog-cta">
<h3>Quanto a inadimplência custa ao seu condomínio?</h3>
<p>Receba uma análise gratuita e sem compromisso. Mostramos em números e indicamos a melhor solução para o seu caso.</p>
<a class="lp-cta-wa" href="${WA}" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> Falar com um especialista</a>
</div>
<a class="blog-back" href="/blog"><i data-lucide="arrow-left"></i> Voltar para o blog</a>
</div></article>` +
    footer;
  fs.mkdirSync(path.join(OUT, p.slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, p.slug, "index.html"), page);
}

// ---- listagem ----
const cards = posts
  .map(
    (p) => `<a class="blog-card" href="/blog/${p.slug}">
<time>${fmtDate(p.date)}</time>
<h2>${p.title}</h2>
<p>${p.description}</p>
<span class="more">Ler artigo <i data-lucide="arrow-right"></i></span>
</a>`
  )
  .join("\n");

const listing =
  head({
    title: "Blog ZARZUR | Gestão condominial, inadimplência e finanças de condomínio",
    description: "Artigos práticos para síndicos e administradoras sobre inadimplência, cobrança, obras e previsibilidade de caixa no condomínio.",
    canonical: `${BASE}/blog`,
    image: `${BASE}/assets/marca-horizontal.png`,
    jsonld: "",
  }) +
  topbar +
  `<section class="blog-hero"><div class="blog-wrap">
<p class="eyebrow">Blog ZARZUR</p>
<h1>Gestão de condomínio, sem o peso da inadimplência.</h1>
<p>Conteúdo prático para síndicos e administradoras: como reduzir inadimplência, financiar obras e dar previsibilidade ao caixa.</p>
</div></section>
<section class="blog-list"><div class="blog-wrap">
<div class="blog-feed">${cards || "<p style='padding:40px 0;color:#6b6b6b'>Em breve, novos artigos.</p>"}</div>
</div></section>` +
  footer;
fs.writeFileSync(path.join(OUT, "index.html"), listing);

// ---- sitemap completo (home + LPs + blog + posts) ----
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${BASE}/`, pr: "1.0", cf: "weekly" },
  { loc: `${BASE}/garantidora`, pr: "0.9", cf: "monthly" },
  { loc: `${BASE}/emprestimo`, pr: "0.9", cf: "monthly" },
  { loc: `${BASE}/compra-garantida`, pr: "0.9", cf: "monthly" },
  { loc: `${BASE}/compra-de-divida`, pr: "0.9", cf: "monthly" },
  { loc: `${BASE}/blog`, pr: "0.7", cf: "weekly" },
  ...posts.map((p) => ({ loc: `${BASE}/blog/${p.slug}`, pr: "0.6", cf: "monthly", lastmod: p.date })),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.cf}</changefreq><priority>${u.pr}</priority></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync("dist/sitemap.xml", sitemap);

console.log(`blog: ${posts.length} artigo(s) gerado(s) + listagem + sitemap atualizado.`);
