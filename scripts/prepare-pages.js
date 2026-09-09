const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "_site");

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(outDir, "index.html"));
fs.copyFileSync(path.join(root, "styles.css"), path.join(outDir, "styles.css"));
copyRecursive(path.join(root, "dist"), path.join(outDir, "dist"));
copyRecursive(path.join(root, "src", "assets"), path.join(outDir, "src", "assets"));

console.log("_site/ listo para publicar.");
