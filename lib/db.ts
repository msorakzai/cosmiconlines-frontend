import mysql from "mysql2/promise";

// ✅ Create connection pool using only env variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Named export for flexibility
export const db = pool;

// ✅ Default export for compatibility
export default pool;

// ✅ Optional connection test (only in dev)
export async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ DB Connected");
    connection.release();
  } catch (err: any) {
    console.error("❌ DB Connection Failed:", err.code, "-", err.message);
  }
}

if (process.env.NODE_ENV === "development") {
  console.log("🔍 Loaded DB ENV:", {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
  });

  testDbConnection();
}
