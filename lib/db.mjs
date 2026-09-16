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

function getSql() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;
  if (!connectionString) return null;
  return neon(connectionString);
}

export function isDatabaseConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_PRISMA_URL,
  );
}

function normalizeLead({ name, email }) {
  const userName = String(name || "").trim().slice(0, 120);
  const userEmail = String(email || "").trim().toLowerCase().slice(0, 180);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  if (!userName || userName.length < 2) return { error: "Informe seu nome." };
  if (!emailOk) return { error: "Informe um e-mail válido." };
  return { userName, userEmail };
}

export async function createQuizSubmission({
  quizType,
  name,
  email,
  summary,
  answers,
}) {
  const lead = normalizeLead({ name, email });
  if (lead.error) return { status: 400, body: { error: lead.error } };

  const type = String(quizType || "").trim().slice(0, 80);
  if (!type) return { status: 400, body: { error: "quizType obrigatório." } };

  const sql = getSql();
  if (!sql) {
    return {
      status: 200,
      body: { id: null, persistence: "disabled", skipped: true },
    };
  }

  try {
    const rows = await sql`
      insert into quiz_submissions (
        quiz_type,
        user_name,
        user_email,
        summary,
        answers
      )
      values (
        ${type},
        ${lead.userName},
        ${lead.userEmail},
        ${summary || {}},
        ${answers || {}}
      )
      returning id, created_at
    `;

    return {
      status: 200,
      body: {
        id: rows[0].id,
        createdAt: rows[0].created_at,
        persistence: "neon",
      },
    };
  } catch (error) {
    return {
      status: 502,
      body: { error: `Não foi possível salvar: ${error.message}` },
    };
  }
}

export async function updateQuizSubmissionAi({ id, ai }) {
  const sql = getSql();
  if (!sql || !id) return { status: 400, body: { error: "id obrigatório." } };

  try {
    const existing = await sql`
      select summary from quiz_submissions where id = ${id} limit 1
    `;
    if (!existing.length) {
      return { status: 404, body: { error: "Envio não encontrado." } };
    }
    const summary = {
      ...(existing[0].summary || {}),
      ai: ai || {},
    };
    const rows = await sql`
      update quiz_submissions
      set summary = ${summary}
      where id = ${id}
      returning id
    `;
    return { status: 200, body: { id: rows[0].id, updated: true } };
  } catch (error) {
    return {
      status: 502,
      body: { error: `Não foi possível atualizar: ${error.message}` },
    };
  }
}

export async function listQuizSubmissions({ quizType, limit = 80 } = {}) {
  const sql = getSql();
  if (!sql) return { status: 503, body: { error: "Banco não configurado." } };

  const safeLimit = Math.min(Math.max(Number(limit) || 80, 1), 200);
  try {
    const rows = quizType
      ? await sql`
          select id, quiz_type, user_name, user_email, summary, created_at, headline
          from quiz_submission_overview
          where quiz_type = ${quizType}
          order by created_at desc
          limit ${safeLimit}
        `
      : await sql`
          select id, quiz_type, user_name, user_email, summary, created_at, headline
          from quiz_submission_overview
          order by created_at desc
          limit ${safeLimit}
        `;

    return {
      status: 200,
      body: {
        submissions: rows.map((row) => ({
          id: row.id,
          quizType: row.quiz_type,
          userName: row.user_name,
          userEmail: row.user_email,
          summary: row.summary,
          createdAt: row.created_at,
          headline: row.headline,
        })),
      },
    };
  } catch (error) {
    return {
      status: 502,
      body: { error: `Falha ao listar: ${error.message}` },
    };
  }
}

export async function getQuizSubmission(id) {
  const sql = getSql();
  if (!sql) return { status: 503, body: { error: "Banco não configurado." } };

  const submissionId = String(id || "").trim();
  if (!submissionId) {
    return { status: 400, body: { error: "Informe o id." } };
  }

  try {
    const rows = await sql`
      select id, quiz_type, user_name, user_email, summary, answers, created_at
      from quiz_submissions
      where id = ${submissionId}
      limit 1
    `;
    if (!rows.length) {
      return { status: 404, body: { error: "Envio não encontrado." } };
    }
    const row = rows[0];
    return {
      status: 200,
      body: {
        submission: {
          id: row.id,
          quizType: row.quiz_type,
          userName: row.user_name,
          userEmail: row.user_email,
          summary: row.summary,
          answers: row.answers,
          createdAt: row.created_at,
        },
      },
    };
  } catch (error) {
    return {
      status: 502,
      body: { error: `Falha ao carregar: ${error.message}` },
    };
  }
}
