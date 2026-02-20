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

export const getCSPReports = async (limit = 50) => {

  const safeLimit = parseInt(limit, 10) || 50;

  const [rows] = await pool.query(`
    SELECT id, document_uri, blocked_uri, violated_directive, original_policy, created_at
    FROM csp_reports
    ORDER BY created_at DESC
    LIMIT ${safeLimit}
  `);

  return rows;
};