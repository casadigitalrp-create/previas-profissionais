import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../docs/", import.meta.url)));
const prefix = "/TiagoNascimento-Previa/";
const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (!pathname.startsWith(prefix)) {
    response.writeHead(404).end();
    return;
  }
  const relative = pathname.slice(prefix.length);
  const target = relative.endsWith("/") || !relative ? `${relative}index.html` : relative;
  const file = resolve(root, target);
  if (!file.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const bytes = await readFile(file);
    response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" }).end(bytes);
  } catch {
    response.writeHead(404).end();
  }
}).listen(4342, "127.0.0.1", () => {
  console.log("Prévia local: http://127.0.0.1:4342/TiagoNascimento-Previa/");
});
