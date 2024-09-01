import pg from "pg";
const pool = new pg.Pool({
  user: "postgres.hvlwysffluesueqcdpim",
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "Taeheen",
  password: "Fb8NYexcO90x3Nol",
  port: 5432,
  max: 20, // Adjust as needed
  idleTimeoutMillis: 30000, // Adjust as needed
  ssl: {
    // These options are often required for connecting to a remote PostgreSQL server
    // Adjust them based on your server's configuration
    rejectUnauthorized: false,
  },
});
export const secret = "abch1525wd";
export const twilio = "55EVF7NG3QM5J63MTX6CXDDS";
export default pool;
