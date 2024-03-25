import pool from "../../config.js";
import jwt from "jsonwebtoken";
import { secret } from "../../config.js";
export const login = async (req, res) => {
  const { password, phone, passport } = req.body;

  // Mock user database
  const rows = await pool.query(
    `select * from "public".users where     phone = ($1) `,
    [phone]
  );

  const user = rows.rows[0];
  if (user) {
    if (
      (phone === user.phone &&
        password === user.password &&
        user.user_type === "2") || // user type 2 is super admin
      (phone === user.phone &&
        passport === user.passport &&
        // user.phone_verified &&
        (user.user_type === "1" || user.user_type === "3")) // user type 1 is user and 3 is emp
    ) {
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
      res.json({ token: token, name: user.user_name });
    } else res.send({ message: "Authentication failed." });
  } else {
    res.status(401).json({ message: "Authentication failed." });
  }
};
