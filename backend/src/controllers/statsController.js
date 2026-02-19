export const getStats = (pool) => async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT category AS nom, COUNT(*) AS compte
      FROM products
      GROUP BY category
    `);

    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};