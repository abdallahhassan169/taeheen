import pool from "../config.js";

export const users = async (req, res) => {
  try {
    const { rows } = await pool.query(
      ` SELECT * 
FROM public.users u 
WHERE u.user_type = 1 
  AND (cast(($3) as text) IS NULL OR 
      (u.user_name LIKE CONCAT('%', cast(($3) as text), '%') ))
        
ORDER BY id DESC 
LIMIT ($1) OFFSET ($2);  `,
      [req.body.limit, req.body.offset, req.body.query]
    );

    res.send(rows);
  } catch (e) {
    res.send("error " + e);
  }
};

export const change_user_status = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `update public.users set is_active = not is_active where id = ($1)`,
      [d.id]
    );
    res.send("success");
  } catch (e) {
    res.send("error " + e);
  }
};

export const register_user = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      ` INSERT INTO public.users(
	user_name, password)
	VALUES ( ($1), ($2) , 1); `,
      [d.user_name, d.password]
    );
    res.send("success");
  } catch (e) {
    res.send("error " + e);
  }
};
