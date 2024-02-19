import pg from "pg";
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "complains",
  password: "***",
  port: 5432,
});
export const secret = "***";

export default pool;
