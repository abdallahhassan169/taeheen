import pool from "../config.js";

export const cities = async (req, res) => {
  try {
    const { rows } = await pool.query(
      ` SELECT * 
FROM public.cities `
    );

    res.send(rows);
  } catch (e) {
    res.send({ "error ": e });
  }
};
