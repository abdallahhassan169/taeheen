import pool from "../config.js";
import jwt from "jsonwebtoken";
import { secret } from "../config.js";
export const login = async (req, res) => {
  const { user_name, password } = req.body;

  // Mock user database
  const rows = await pool.query(
    `select * from "public".users where user_name = ($1) `,
    [user_name]
  );

  const user = rows.rows[0];
  if (user) {
    if (user_name === user.user_name && password === user.password) {
      // Sign a JWT with the user information
      const token = jwt.sign(
        {
          id: user.id,
          user_name: user.user_name,
          user_type: user.user_type,
          city_id: user?.city_id,
        },
        secret
      );

      // Return the token
      res.json({ token });
    }
  } else {
    res.status(401).json({ message: "Authentication failed." });
  }
};
