import pg from "pg";
const pool = new pg.Pool({
  user: "abdallah",
  host: "dpg-cn9p3rv79t8c73c51vd0-a.oregon-postgres.render.com",
  database: "complains",
  password: "NjAo5XQyVpWJNz2KCMPIMDktWzQOLizx",
  port: 5432,
  max: 20, // Adjust as needed
  idleTimeoutMillis: 30000, // Adjust as needed
});
export const secret = "abch1525wd";

export default pool;
