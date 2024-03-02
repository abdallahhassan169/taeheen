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

c.* , u.user_name as user_name , (public.haversine_distance(
  ($3),
	($2),
   c.latitude,
	c.langitude 
	 
))
 as distance from public.complains c join users u on u.id = c.user_id
where 
 c.city_id = ($1) or (public.haversine_distance(
  ($3),
	($2),
   c.latitude,
	c.langitude 
	 
) < 25000) order by c.date desc limit ($4) offset ($5)  ; `,
      [
        req?.user?.city_id,
        req.body.langitude,
        req.body.latitude,
        req.body.limit,
        req.body.offset,
      ]
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

export const upsert_guets_complain = async (req, res) => {
  try {
    if (!req.body.id) {
      const clientIp = "ip" + req.clientIp;
      console.log(clientIp);
      const d = req.body;
      console.log(d);
      const imageUrl = `${req.protocol}://${req.get("host")}/image/${
        req?.file?.filename
      }`;
      const rows = await pool.query(
        ` INSERT INTO public.complains(
	  name, relation, age, description, clothes_color, img, user_id, passport , date,ip,city_id , langitude , latitude , nationality)
	VALUES (  ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8) , CURRENT_TIMESTAMP,($9) , ($10) , ($11) ,($12) , ($13)); `,
        [
          d.name,
          d.relation,
          d.age,
          d.description,
          d.clothes_color,
          imageUrl,
          req.user?.id ?? null,
          req.body.passport,
          clientIp,
          req.body.city,
          d.langitude,
          d.latitude,
          d.nationality,
        ]
      );
    } else {
      //     const d = req.body;
      //     const imageUrl = `/image/${req?.file?.filename}`;
      //     const rows = await pool.query(
      //       `UPDATE public.complains
      // SET   name=($1), relation=($2), age=($3), description=($4), clothes_color= ($5), img=($6),   passport=($7)
      // where id = ($8)
      //  `,
      //       [
      //         d.name,
      //         d.relation,
      //         d.age,
      //         d.description,
      //         d.clothes_color,
      //         imageUrl,
      //         req.body.passport,
      //         d.id,
      //       ]
      //     );
      return;
    }
    res.send({ message: "sucseess" });
  } catch (e) {
    res.send("an error occured : " + e);
  }
};

export const upsert_complain = async (req, res) => {
  try {
    if (!req.body.id) {
      const d = req.body;
      console.log(d);
      const imageUrl = `${req?.file?.filename}`;
      const rows = await pool.query(
        ` INSERT INTO public.complains(
	  name, relation, age, description, clothes_color, img, user_id, passport , date,city_id ,langitude , latitude ,nationality )
	VALUES (  ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8) , CURRENT_TIMESTAMP,($9) , ($10) , ($11) ,  ($12)); `,
        [
          d.name,
          d.relation,
          d.age,
          d.description,
          d.clothes_color,
          imageUrl,
          req.user?.id ?? null,
          req.body.passport,
          req.body.city,
          d.langitude,
          d.latitude,
          d.nationality,
        ]
      );
    } else {
      return;
      //     const d = req.body;
      //     const imageUrl = `/image/${req?.file?.filename}`;
      //     const rows = await pool.query(
      //       `UPDATE public.complains
      // SET   name=($1), relation=($2), age=($3), description=($4), clothes_color= ($5), img=($6),   passport=($7)
      // where id = ($8)
      //  `,
      //       [
      //         d.name,
      //         d.relation,
      //         d.age,
      //         d.description,
      //         d.clothes_color,
      //         imageUrl,
      //         req.body.passport,
      //         d.id,
      //       ]
      //     );
    }
    res.send({ message: "sucseess" });
  } catch (e) {
    res.send("an error occured : " + e);
  }
};
