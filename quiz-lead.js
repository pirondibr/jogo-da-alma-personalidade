/* Lead gate + save via /api/quiz-submissions (Neon) */
(function (global) {
  const STORAGE_KEY = "sg_quiz_lead";
  let saveInFlight = false;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function getLead() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.name || !data.email) return null;
      return {
        name: String(data.name).trim(),
        email: String(data.email).trim().toLowerCase(),
      };
    } catch {
      return null;
    }
  }

  function setLead(name, email) {
    const lead = {
      name: String(name || "").trim(),
      email: String(email || "").trim().toLowerCase(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
    return lead;
  }

  function renderLeadForm(opts) {
    const title = opts.title || "Antes de começar";
    const subtitle =
      opts.subtitle || "Digite seu nome e e-mail para iniciar o questionário.";
    const buttonLabel = opts.buttonLabel || "Continuar";
    const existing = getLead() || { name: "", email: "" };

    return `
      <div class="quiz-lead-card">
        <div class="quiz-lead-icon"></div>
        <h1>${esc(title)}</h1>
        <p class="quiz-lead-sub">${esc(subtitle)}</p>
        <form class="quiz-lead-form" id="quizLeadForm" novalidate>
          <label class="quiz-lead-label" for="quizLeadName">Nome</label>
          <input class="quiz-lead-input" id="quizLeadName" name="name" type="text" autocomplete="name" required placeholder="Seu nome" value="${esc(existing.name)}">
          <label class="quiz-lead-label" for="quizLeadEmail">E-mail</label>
          <input class="quiz-lead-input" id="quizLeadEmail" name="email" type="email" autocomplete="email" required placeholder="voce@email.com" value="${esc(existing.email)}">
          <p class="quiz-lead-error" id="quizLeadError" hidden></p>
          <button class="quiz-lead-btn" type="submit">${esc(buttonLabel)}</button>
          <p class="quiz-lead-note">Usamos esses dados apenas para guardar seus resultados e melhorar a experiência.</p>
        </form>
      </div>`;
  }

  function bindLeadForm(onContinue) {
    const form = document.getElementById("quizLeadForm");
    const err = document.getElementById("quizLeadError");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("quizLeadName")?.value || "").trim();
      const email = (
        document.getElementById("quizLeadEmail")?.value || ""
      ).trim();

      if (name.length < 2) {
        err.hidden = false;
        err.textContent = "Digite seu nome.";
        return;
      }
      if (!isValidEmail(email)) {
        err.hidden = false;
        err.textContent = "Digite um e-mail válido.";
        return;
      }

      err.hidden = true;
      setLead(name, email);
      if (typeof onContinue === "function") onContinue(getLead());
    });
  }

  async function saveQuizSubmission({ quizType, summary, answers }) {
    const lead = getLead();
    if (!lead) throw new Error("Falta nome/e-mail");
    if (saveInFlight) return { ok: false, skipped: true };

    saveInFlight = true;
    try {
      const resp = await fetch("/api/quiz-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizType,
          name: lead.name,
          email: lead.email,
          summary: summary || {},
          answers: answers || {},
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        throw new Error(data.error || `Falha ao salvar (${resp.status})`);
      }

      if (data.skipped || data.persistence === "disabled") {
        return { ok: false, skipped: true, ...data };
      }

      return { ok: true, id: data.id, ...data };
    } finally {
      saveInFlight = false;
    }
  }

  async function attachQuizAi({ id, ai }) {
    if (!id || !ai) return { ok: false, skipped: true };
    try {
      const resp = await fetch("/api/quiz-submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ai }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        return { ok: false, error: data.error || "Falha ao anexar AI" };
      }
      return { ok: true, ...data };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  function saveStatusHtml(state) {
    if (state === "saving") {
      return '<p class="quiz-save-status quiz-save-saving">Salvando seus resultados…</p>';
    }
    if (state === "saved") {
      return '<p class="quiz-save-status quiz-save-ok">Resultados salvos. Você pode voltar depois: seu mapa fica vinculado ao seu e-mail.</p>';
    }
    if (state === "error") {
      return '<p class="quiz-save-status quiz-save-err">Seus resultados estão prontos, mas não conseguimos salvar agora. Você ainda pode baixar o PDF.</p>';
    }
    return "";
  }

  global.QuizLead = {
    getLead,
    setLead,
    renderLeadForm,
    bindLeadForm,
    saveQuizSubmission,
    attachQuizAi,
    saveStatusHtml,
    isValidEmail,
  };
})(window);
