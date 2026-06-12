// api/blog.js — Backend do CMS do blog.
// Protegido por senha. Grava posts (.md) e imagens no repositório via GitHub API,
// o que dispara o rebuild automático na Vercel e publica o conteúdo.
// Segredos ficam SÓ em variáveis de ambiente (ADMIN_PASSWORD, GITHUB_TOKEN).
// O repositório é público; este código não contém nenhuma senha.

import crypto from "node:crypto";

const OWNER = "Julio-Machado-Gomes";
const REPO = "zarzur-site";
const BRANCH = "main";
const GH = "https://api.github.com";

function safeEqual(a, b) {
  const ba = Buffer.from(String(a || ""));
  const bb = Buffer.from(String(b || ""));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function slugify(s) {
  return String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

async function gh(pathname, opts = {}) {
  return fetch(GH + pathname, {
    ...opts,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "zarzur-cms",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(opts.headers || {}),
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body || typeof body !== "object") body = {};
  const { action, password } = body;

  if (!process.env.ADMIN_PASSWORD || !process.env.GITHUB_TOKEN) {
    res.status(500).json({ error: "CMS não configurado. Defina ADMIN_PASSWORD e GITHUB_TOKEN nas variáveis de ambiente da Vercel." });
    return;
  }
  if (!safeEqual(password, process.env.ADMIN_PASSWORD)) {
    res.status(401).json({ error: "Senha incorreta." });
    return;
  }

  try {
    if (action === "auth") {
      res.json({ ok: true });
      return;
    }

    if (action === "list") {
      const r = await gh(`/repos/${OWNER}/${REPO}/contents/content/blog?ref=${BRANCH}`);
      if (r.status === 404) { res.json({ posts: [] }); return; }
      const files = await r.json();
      const posts = [];
      for (const f of (Array.isArray(files) ? files : [])) {
        if (!f.name.endsWith(".md")) continue;
        const cr = await gh(`/repos/${OWNER}/${REPO}/contents/${f.path}?ref=${BRANCH}`);
        const cj = await cr.json();
        const raw = Buffer.from(cj.content, "base64").toString("utf-8");
        const title = (raw.match(/title:\s*"?(.*?)"?\s*$/m) || [])[1] || f.name;
        const date = (raw.match(/date:\s*"?(.*?)"?\s*$/m) || [])[1] || "";
        posts.push({ slug: f.name.replace(/\.md$/, ""), title, date });
      }
      posts.sort((a, b) => (a.date < b.date ? 1 : -1));
      res.json({ posts });
      return;
    }

    if (action === "get") {
      const slug = slugify(body.slug);
      const r = await gh(`/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.md?ref=${BRANCH}`);
      if (!r.ok) { res.status(404).json({ error: "Post não encontrado." }); return; }
      const j = await r.json();
      res.json({ raw: Buffer.from(j.content, "base64").toString("utf-8"), sha: j.sha });
      return;
    }

    if (action === "upload") {
      const ext = (body.ext || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase();
      const name = `${Date.now()}-${slugify(body.filename || "img")}.${ext}`;
      const put = await gh(`/repos/${OWNER}/${REPO}/contents/public/assets/blog/${name}`, {
        method: "PUT",
        body: JSON.stringify({
          message: `blog: imagem ${name}`,
          content: body.base64,
          branch: BRANCH,
        }),
      });
      if (!put.ok) { res.status(500).json({ error: "Falha no upload: " + (await put.text()) }); return; }
      res.json({ ok: true, url: `/assets/blog/${name}` });
      return;
    }

    if (action === "save") {
      const slug = slugify(body.slug || body.title);
      if (!slug) { res.status(400).json({ error: "Informe um título." }); return; }
      const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const tags = Array.isArray(body.tags) ? body.tags : String(body.tags || "").split(",").map(t => t.trim()).filter(Boolean);
      const fm = [
        "---",
        `title: "${esc(body.title)}"`,
        `description: "${esc(body.description)}"`,
        `slug: "${slug}"`,
        `date: "${body.date || new Date().toISOString().slice(0, 10)}"`,
        `author: "${esc(body.author) || "ZARZUR Soluções Financeiras"}"`,
        `cover: "${esc(body.cover) || "/assets/symbol-gold.svg"}"`,
        `tags: [${tags.map(t => `"${esc(t)}"`).join(", ")}]`,
        "---",
        "",
        body.markdown || "",
        "",
      ].join("\n");
      const path = `content/blog/${slug}.md`;
      let sha = body.sha;
      if (!sha) {
        const ex = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
        if (ex.ok) sha = (await ex.json()).sha;
      }
      const put = await gh(`/repos/${OWNER}/${REPO}/contents/${path}`, {
        method: "PUT",
        body: JSON.stringify({
          message: `blog: ${sha ? "atualiza" : "publica"} ${slug}`,
          content: Buffer.from(fm, "utf-8").toString("base64"),
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });
      if (!put.ok) { res.status(500).json({ error: "Falha ao salvar: " + (await put.text()) }); return; }
      res.json({ ok: true, slug });
      return;
    }

    if (action === "delete") {
      const slug = slugify(body.slug);
      const ex = await gh(`/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.md?ref=${BRANCH}`);
      if (!ex.ok) { res.status(404).json({ error: "Post não encontrado." }); return; }
      const sha = (await ex.json()).sha;
      const del = await gh(`/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.md`, {
        method: "DELETE",
        body: JSON.stringify({ message: `blog: remove ${slug}`, sha, branch: BRANCH }),
      });
      if (!del.ok) { res.status(500).json({ error: "Falha ao remover: " + (await del.text()) }); return; }
      res.json({ ok: true });
      return;
    }

    res.status(400).json({ error: "Ação inválida." });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
