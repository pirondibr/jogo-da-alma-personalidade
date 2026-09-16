import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadEnvFiles() {
  for (const fileName of [".env.local", ".env"]) {
    try {
      const content = await readFile(path.join(root, fileName), "utf8");
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*?)\s*$/);
        if (!match) continue;
        const key = match[1];
        const value = match[2].replace(/^["']|["']$/g, "");
        if (process.env[key] === undefined) process.env[key] = value;
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

await loadEnvFiles();

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  console.error("DATABASE_URL não encontrado.");
  process.exit(1);
}

const sql = neon(connectionString);
const schema = await readFile(path.join(root, "db", "schema-quiz.sql"), "utf8");

const statements = schema
  .split(/;\s*\n/)
  .map((part) =>
    part
      .split(/\r?\n/)
      .filter((line) => !/^\s*--/.test(line))
      .join("\n")
      .trim(),
  )
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log(`OK: ${statement.slice(0, 60).replace(/\s+/g, " ")}...`);
}

console.log("Schema de questionários aplicado no Neon.");
