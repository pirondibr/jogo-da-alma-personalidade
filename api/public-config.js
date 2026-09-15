export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  // Optional future Supabase wiring. Without env, quiz-lead skips persistence.
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(204).end();
  }
  return res.status(200).json({ supabaseUrl, supabaseAnonKey });
}
