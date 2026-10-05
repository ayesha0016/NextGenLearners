import mysql from 'mysql2/promise';

// Create a connection pool using environment variables from Vercel
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: false } // Required for cloud databases like Aiven
});

export default async function handler(req, res) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      
      // Run your SQL query
      const [result] = await pool.execute(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );

      return res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}