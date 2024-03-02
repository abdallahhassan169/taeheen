import pool from "../config.js";

export const emps = async (req, res) => {
  try {
    const { rows } = await pool.query(
      ` SELECT * 
FROM public.users u 
WHERE u.user_type = 3 
  AND (cast(($3) as text) IS NULL OR 
      (u.user_name LIKE CONCAT('%', cast(($3) as text), '%') ))
        
ORDER BY id DESC 
LIMIT ($1) OFFSET ($2);  `,
      [req.body.limit, req.body.offset, req.body.query]
    );

    res.send(rows);
  } catch (e) {
    res.send({ "error ": e });
  }
};

export const upsert_emp = async (req, res) => {
  try {
    if (!req.body.id) {
      const d = req.body;
      const { rows } = await pool.query(
        ` INSERT INTO public.users(
	user_name, password , user_type, passport , phone , city_id)
	VALUES ( ($1), ($2) , 3 , ($3) , ($4) , ($5) ) returning id ; `,
        [d.user_name, d.password, d.passport, d.phone, d.city]
      );
    } else {
      const d = req.body;
      const { rows } = await pool.query(
        ` update public.users set user_name = ($1) , password = ($2) , passport = ($3) phone=($4) ; `,
        [d.user_name, d.password, d.passport, d.phone]
      );
    }

    res.send({ message: "sucseess" });
  } catch (e) {
    res.send({ "error ": e });
  }
};
