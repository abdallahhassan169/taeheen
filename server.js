// ------------------- IMPORTS ---------------//

import express from "express";
import authMiddleware from "./src/auth/MiddleWare.js";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import requestIp from "request-ip";
import { login } from "./src/auth/login.js";
import { emps, upsert_emp } from "./src/employees.js";
import { change_user_status, users } from "./src/users.js";
import { stats } from "./src/statistics.js";
import {
  admin_coms,
  cancel_complain,
  end_complain,
  get_complain_by_id,
  get_emp_coms,
  get_user_complains,
  send_emp_note,
  upsert_complain,
  upsert_guets_complain,
} from "./src/complains.js";
import {
  delete_comment,
  get_comments,
  get_user_comments,
  insert_comment,
} from "./src/comments.js";
import { cities } from "./src/lokkups.js";
import { isAdmin, isEmployee } from "./src/adminCheck.js";
import { fileFilter, get_image, storage } from "./src/files.js";
import {
  generate_new_code,
  register_user,
  verify,
} from "./src/auth/register.js";
//------------------------------- declare APP and middlewares
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(requestIp.mw());

const upload = multer({ storage: storage /* fileFilter: fileFilter}*/ });
app.use("/uploads", express.static("uploads"));

app.use([authMiddleware]);
//app.use(Validator)  // stopped for testing reasons
//------------------------------------------APIS -----------------------------------
app.get("/image", get_image);
app.post("/login", login);

app.post(
  "/upsert_guest_complain",
  upload.single("image"),
  upsert_guets_complain
);
app.post("/register", register_user);
app.post("/verify", verify);
app.post("/new_code", generate_new_code);
app.post("/upsert_complain", upload.single("image"), upsert_complain);

app.post("/get_complains", get_user_complains);

app.post("/upsert_admin", isAdmin, upsert_emp);

app.post("/insert_comment", insert_comment);

app.post("/delete_comment", isAdmin, delete_comment);

app.post("/cancel_complain", isAdmin, cancel_complain);

app.post("/complete_complain", end_complain);

app.post("/get_comments", isAdmin, get_comments);

app.post("/get_emp_complains", isEmployee, get_emp_coms);
app.post("/send_note", isEmployee, send_emp_note);
app.post("/get_user_comments", get_user_comments);
app.post("/get_admin_complains", isAdmin, admin_coms);
app.post("/get_complain_by_id", get_complain_by_id);
app.post("/get_cities", cities);

app.post("/statistics", isAdmin, stats);
app.post("/all_users", isAdmin, users);
app.post("/all_emps", isAdmin, emps);
app.post("/change_user_status", isAdmin, change_user_status);

app.listen(3015, () => console.log("first"));
