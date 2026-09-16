import { assertDashboardAccess } from "../lib/auth.mjs";
import {
  createQuizSubmission,
  getQuizSubmission,
  isDatabaseConfigured,
  listQuizSubmissions,
  updateQuizSubmissionAi,
} from "../lib/db.mjs";

function readBody(request) {
  if (typeof request.body === "string") {
    return JSON.parse(request.body || "{}");
  }
  return request.body || {};
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "POST") {
    try {
      const body = readBody(request);
      const result = await createQuizSubmission({
        quizType: body.quizType || body.quiz_type,
        name: body.name,
        email: body.email,
        summary: body.summary,
        answers: body.answers,
      });
      return response.status(result.status).json(result.body);
    } catch {
      return response.status(400).json({ error: "JSON inválido." });
    }
  }

  if (request.method === "PATCH") {
    const auth = assertDashboardAccess(request);
    // Allow patch with submission secret-less for AI update from same browser session:
    // use open patch only when body has id from client after create — no auth for ai attach.
    try {
      const body = readBody(request);
      const url = new URL(request.url, "http://localhost");
      const id = body.id || url.searchParams.get("id");
      if (!body.ai) {
        if (!auth.ok) return response.status(auth.status).json(auth.body);
      }
      const result = await updateQuizSubmissionAi({ id, ai: body.ai });
      return response.status(result.status).json(result.body);
    } catch {
      return response.status(400).json({ error: "JSON inválido." });
    }
  }

  if (request.method === "GET") {
    const auth = assertDashboardAccess(request);
    if (!auth.ok) return response.status(auth.status).json(auth.body);
    if (!isDatabaseConfigured()) {
      return response.status(503).json({ error: "Banco não configurado." });
    }

    const url = new URL(request.url, "http://localhost");
    const id = url.searchParams.get("id");
    if (id) {
      const result = await getQuizSubmission(id);
      return response.status(result.status).json(result.body);
    }

    const result = await listQuizSubmissions({
      quizType: url.searchParams.get("type") || undefined,
      limit: url.searchParams.get("limit") || 80,
    });
    return response.status(result.status).json(result.body);
  }

  return response.status(405).json({ error: "Método não permitido." });
}
