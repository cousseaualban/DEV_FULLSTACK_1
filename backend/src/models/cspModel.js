import pool from "../config/db.js";

export async function saveCSPReport(report) {
  if (!report) return;

  const documentUri = report["document-uri"] || "";
  const blockedUri = report["blocked-uri"] || "";
  const violatedDirective = report["violated-directive"] || "";
  const originalPolicy = report["original-policy"] || "";

  const sql = `
    INSERT INTO csp_reports
    (document_uri, blocked_uri, violated_directive, original_policy)
    VALUES (?, ?, ?, ?)
  `;

  await pool.execute(sql, [
    documentUri,
    blockedUri,
    violatedDirective,
    originalPolicy,
  ]);
}

/**
 * Récupère les dernières violations CSP
 * @param {number} limit - nombre maximum de reports à récupérer
 */
export async function getCSPReports(limit = 50) {
  const [rows] = await pool.execute(
    `
      SELECT id, document_uri, blocked_uri, violated_directive, original_policy, created_at
      FROM csp_reports
      ORDER BY created_at DESC
      LIMIT ?
    `,
    [limit]
  );
  return rows;
}