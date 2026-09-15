export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const rawKey = process.env.OPENROUTER_API_KEY || "";
  const apiKey = /^[a-f0-9]{64}$/i.test(rawKey) ? `sk-or-v1-${rawKey}` : rawKey;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.5";

  if (!apiKey) {
    return res.status(500).json({
      error: "Configure OPENROUTER_API_KEY no ambiente da Vercel.",
    });
  }

  const body =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const prompt = typeof body.prompt === "string" ? body.prompt.slice(0, 20_000) : "";
  if (!prompt) {
    return res.status(400).json({ error: "Prompt inválido." });
  }

  const system =
    'You are an assistant for Jogo da Alma methodology. Respond in Brazilian Portuguese. Be warm, clear, practical, non-clinical. Return ONLY valid JSON: {"geral":"...","foco1":"...","foco2":"..."}. Each string 2-4 sentences.';

  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || "https";

  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": `${proto}://${host}`,
        "X-Title": "Jogo da Alma",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(60_000),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const detail =
        data?.error?.message || `OpenRouter respondeu com HTTP ${upstream.status}.`;
      return res.status(upstream.status).json({ error: detail });
    }

    const content =
      data?.choices?.[0]?.message?.content &&
      typeof data.choices[0].message.content === "string"
        ? data.choices[0].message.content
        : Array.isArray(data?.choices?.[0]?.message?.content)
          ? data.choices[0].message.content
              .filter((p) => p?.type === "text")
              .map((p) => p.text)
              .join("\n")
          : "";

    return res.status(200).json({ content, model });
  } catch (error) {
    const message =
      error.name === "TimeoutError"
        ? "A resposta demorou demais."
        : "Não foi possível conectar ao OpenRouter.";
    return res.status(502).json({ error: message });
  }
}
