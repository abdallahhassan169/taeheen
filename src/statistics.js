import pool from "../config.js";

export const stats = async (req, res) => {
  try {
    const { rows } = await pool.query(
      ` select
(select count(id) from public.users u  where u.user_type = 1) as users,
(select count(id) from public.users u  where u.user_type = 2) as admins,
(select count(id) from public.users u  where u.user_type = 3) as emps,
(select count(id) from public.complains c  where c.status is null) as active_reports,
(select count(id) from public.complains c  where c.status is true) as approved_reports,
(select count(id) from public.complains c  where c.status is false) as declined_reports,
(select count(id) from public."Comments"  c  where c.is_deleted is not true) as comments,
(select count(id) from public."Comments" c  where c.is_deleted is   true) as deleted_comments,
(select count(id) from public."complains" c  where c.ip is not null) as guest

`
    );

    res.send(rows);
  } catch (e) {
    res.send("error " + e);
  }
};
