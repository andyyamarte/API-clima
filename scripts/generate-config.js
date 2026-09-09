const fs = require("fs");
const path = require("path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const env = {};
  for (const line of fs.readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed
      .slice(idx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    env[key] = value;
  }
  return env;
}

const root = path.join(__dirname, "..");
const localEnv = loadEnvFile(path.join(root, ".env"));
const apiKey = process.env.API_KEY || localEnv.API_KEY;

if (!apiKey) {
  console.error(
    "Error: falta API_KEY. Crea un archivo .env en la raiz con API_KEY=tu_key (ver .env.example)."
  );
  process.exit(1);
}

const output = `export const API_KEY = ${JSON.stringify(apiKey)};\n`;
fs.writeFileSync(path.join(root, "src", "config.ts"), output);
console.log("src/config.ts generado.");
