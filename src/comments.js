import pool from "../config.js";

export const get_comments = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `select c.* , u.user_name from public."Comments" c join public.users u on u.id = c.user_id  where is_deleted is not true order by date desc`
    );
    res.send(rows);
  } catch (e) {
    res.send({ "error ": e });
  }
};

export const delete_comment = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `update public."Comments" set is_deleted = true where id = ($1)`,
      [d.id]
    );
    console.log(d.id, "id ");
    res.send({ message: "success" });
  } catch (e) {
    res.send({ "error ": e });
  }
};
export const insert_comment = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      ` INSERT INTO public."Comments"(
	body , date, user_id , rate )
	VALUES ( ($1) , current_date , ($2) , ($3) ); `,
      [d.comment, req?.user?.id, d.rate]
    );
    res.send({ message: "sucseess" });
  } catch (e) {
    res.send({ "error ": e });
  }
};

export const get_user_comments = async (req, res) => {
  try {
    const d = req.body;
    const { rows } = await pool.query(
      `select c.* , u.user_name from public."Comments" c join public.users u on u.id = c.user_id  where c.is_approved is true   order by date desc limit ($1) offset ($2)`,
      [req.body.limit, req.body.offset]
    );
    res.send(rows);
  } catch (e) {
    res.send({ "error ": e });
  }
};
