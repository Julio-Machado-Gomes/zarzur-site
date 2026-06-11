import fs from "node:fs";

const { render } = await import("./dist-server/entry-server.js");
const template = fs.readFileSync("dist/index.html", "utf-8");
const appHtml = render();
const out = template.replace("<!--app-html-->", appHtml);
fs.writeFileSync("dist/index.html", out);
console.log("prerender: home renderizada para HTML estático.");
