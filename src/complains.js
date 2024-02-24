import pool from "../config.js";

export const get_complain_by_id = async (req, res) => {
  try {
    const user = req.user.id;
    const { rows } = await pool.query(
      `SELECT
  c.*, 
  u.user_name AS user 
FROM 
  public.complains c
  LEFT JOIN public.users u ON c.user_id = u.id
WHERE 
 c.id = ($1) and user_id = ($2)
  `,
      [req.body.id, user]
    );
    console.log(rows);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send("error " + e);
  }
};

export const admin_coms = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
  c.*, 
  u.user_name AS user 
FROM 
  public.complains c
  LEFT JOIN public.users u ON c.user_id = u.id
WHERE 
  (
    (CAST($3 AS BOOLEAN) IS NULL AND c.status IS NULL) OR
    (c.status = CAST($3 AS BOOLEAN))
  )
ORDER BY 
  date DESC 
LIMIT $1 
OFFSET $2;
  `,
      [req.body.limit ?? 100, req.body.offset ?? 0, req.body.status ?? null]
    );
    console.log(rows);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send("error " + e);
  }
};

export const get_emp_coms = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      ` select

c.* , u.user_name as user_name from public.complains c join users u on u.id = c.user_id
where 
 c.city_id = ($1) `,
      [req?.user?.city_id]
    );
    console.log(req.user);
    res.send(rows);
  } catch (e) {
    res.send("error " + e);
  }
};

export const end_complain = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `update public.complains set status = true where id = ($1)`,
      [d.id]
    );
    res.send("success");
  } catch (e) {
    res.send("error " + e);
  }
};

export const cancel_complain = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `update public.complains set status = false where id = ($1)`,
      [d.id]
    );
    res.send("success");
  } catch (e) {
    res.send("error " + e);
  }
};

export const get_user_complains = async (req, res) => {
  try {
    const clientIp = "ip" + req.clientIp;

    const { rows } = await pool.query(
      ` select * from public.complains where user_id = ($1) or ip =($2) order by id desc`,
      [req.user?.id, clientIp]
    );
    res.send(rows);
  } catch (e) {
    res.send("error " + e);
  }
};
