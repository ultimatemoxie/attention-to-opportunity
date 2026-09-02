import { cp, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputRoot = join(projectRoot, ".output");
const distRoot = join(projectRoot, "dist");
const serverRoot = join(distRoot, "server");
const publicRoot = join(outputRoot, "public");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : path;
    }),
  );

  return files.flat();
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });
await cp(join(outputRoot, "server"), serverRoot, { recursive: true });
await cp(publicRoot, join(distRoot, "public"), { recursive: true });
await rename(join(serverRoot, "index.mjs"), join(serverRoot, "worker.mjs"));

const assets = {};

for (const path of await listFiles(publicRoot)) {
  const pathname = `/${relative(publicRoot, path).split(sep).join("/")}`;
  const data = await readFile(path);
  assets[pathname] = {
    body: data.toString("base64"),
    contentType: contentTypes[extname(path).toLowerCase()] ?? "application/octet-stream",
  };
}

await writeFile(
  join(serverRoot, "embedded-assets.mjs"),
  `export const assets = ${JSON.stringify(assets)};\n`,
);

await writeFile(
  join(serverRoot, "index.js"),
  `import worker from "./worker.mjs";
import { assets } from "./embedded-assets.mjs";

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

const siteWorker = {
  ...worker,
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const asset = assets[url.pathname];

    if (asset) {
      const headers = new Headers({
        "Content-Type": asset.contentType,
        "Cache-Control": url.pathname.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=3600",
      });

      return new Response(
        request.method === "HEAD" ? null : decodeBase64(asset.body),
        { status: 200, headers },
      );
    }

    return worker.fetch(request, env, context);
  },
};

export default siteWorker;
`,
);

console.log(`Prepared Sites deployment with ${Object.keys(assets).length} embedded assets.`);
