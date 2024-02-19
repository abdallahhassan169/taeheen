import pg from "pg";
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "complains",
  password: "11620000",
  port: 5432,
});
export const secret = "abch1525wd";

export default pool;
