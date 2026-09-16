import { timingSafeEqual } from "node:crypto";

export function getDashboardPassword() {
  return String(process.env.DASHBOARD_PASSWORD || "").trim();
}

export function isDashboardConfigured() {
  return getDashboardPassword().length >= 6;
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function extractDashboardPassword(request) {
  const header =
    request.headers["x-dashboard-password"] ||
    request.headers["authorization"] ||
    "";
  const value = Array.isArray(header) ? header[0] : header;
  if (!value) return "";
  if (/^bearer\s+/i.test(value)) return value.replace(/^bearer\s+/i, "").trim();
  return String(value).trim();
}

export function assertDashboardAccess(request) {
  if (!isDashboardConfigured()) {
    return {
      ok: false,
      status: 503,
      body: {
        error:
          "Dashboard sem senha. Defina DASHBOARD_PASSWORD nas variáveis de ambiente.",
      },
    };
  }

  const provided = extractDashboardPassword(request);
  if (!provided || !safeEqual(provided, getDashboardPassword())) {
    return {
      ok: false,
      status: 401,
      body: { error: "Senha inválida." },
    };
  }

  return { ok: true };
}
