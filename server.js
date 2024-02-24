import express from "express";
import authMiddleware, { authorized } from "./auth/MiddleWare.js";
import multer from "multer";
import pool from "./config.js";
import bodyParser from "body-parser";
import cors from "cors";
import { extname } from "path";
import requestIp from "request-ip";
import process from "process";
const app = express();

import { login } from "./auth/login.js";
import { emps, upsert_emp } from "./src/employees.js";
import { change_user_status, register_user, users } from "./src/users.js";
import { stats } from "./src/statistics.js";
import {
  admin_coms,
  cancel_complain,
  end_complain,
  get_complain_by_id,
  get_emp_coms,
  get_user_complains,
} from "./src/complains.js";
import {
  delete_comment,
  get_comments,
  insert_comment,
} from "./src/comments.js";
import { cities } from "./src/lokkups.js";
import { isAdmin, isEmployee } from "./src/adminCheck.js";

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(express.json());

app.post("/login", login);
app.get("/image", (req, res) => {
  const filename = req.query.img;
  console.log(req.params, "params");
  try {
    res.sendFile(`${process.cwd()}/image/${filename}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
app.use(requestIp.mw());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Use the current timestamp as the filename
    cb(null, Date.now() + extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file type is allowed
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG images are allowed."),
      false
    );
  }
};
const upload = multer({ storage, fileFilter });
app.use("/uploads", express.static("uploads"));

app.post("/upsert_guest_complain", upload.single("image"), async (req, res) => {
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
	  name, relation, age, description, clothes_color, img, user_id, passport , date,ip,city_id , langitude , latitude)
	VALUES (  ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8) , CURRENT_TIMESTAMP,($9) , ($10) , ($11) ,($12)); `,
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
});
app.post("/register", register_user);

app.use([authMiddleware]);

app.post("/upsert_complain", upload.single("image"), async (req, res) => {
  try {
    if (!req.body.id) {
      const d = req.body;
      console.log(d);
      const imageUrl = `${req?.file?.filename}`;
      const rows = await pool.query(
        ` INSERT INTO public.complains(
	  name, relation, age, description, clothes_color, img, user_id, passport , date,city_id ,langitude , latitude )
	VALUES (  ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8) , CURRENT_TIMESTAMP,($9) , ($10) , ($11)); `,
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
});

app.post("/get_complains", get_user_complains);

app.post("/upsert_admin", isAdmin, upsert_emp);

app.post("/insert_comment", insert_comment);

app.post("/delete_comment", isAdmin, delete_comment);

app.post("/cancel_complain", isAdmin, cancel_complain);

app.post("/complete_complain", end_complain);

app.post("/get_comments", isAdmin, get_comments);

app.post("/get_emp_complains", isEmployee, get_emp_coms);
app.post("/get_cities", cities);
app.post("/get_admin_complains", isAdmin, admin_coms);
app.post("/get_complain_by_id", get_complain_by_id);

app.post("/statistics", isAdmin, stats);
app.post("/all_users", isAdmin, users);
app.post("/all_emps", isAdmin, emps);
app.post("/change_user_status", isAdmin, change_user_status);

app.listen(3015, () => console.log("first"));
