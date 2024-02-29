// ------------------- IMPORTS ---------------//

import express from "express";
import authMiddleware from "./auth/MiddleWare.js";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import requestIp from "request-ip";
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

//------------------------------- declare APP and middlewares
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/login", login);
app.get("/image", get_image);
app.use(requestIp.mw());

const upload = multer({ storage: storage, fileFilter: fileFilter });
app.use("/uploads", express.static("uploads"));

//------------------------------------------APIS -----------------------------------
app.post(
  "/upsert_guest_complain",
  upload.single("image"),
  upsert_guets_complain
);
app.post("/register", register_user);

app.use([authMiddleware]);

app.post("/upsert_complain", upload.single("image"), upsert_complain);

app.post("/get_complains", get_user_complains);

app.post("/upsert_admin", isAdmin, upsert_emp);

app.post("/insert_comment", insert_comment);

app.post("/delete_comment", isAdmin, delete_comment);

app.post("/cancel_complain", isAdmin, cancel_complain);

app.post("/complete_complain", end_complain);

app.post("/get_comments", isAdmin, get_comments);

app.post("/get_emp_complains", isEmployee, get_emp_coms);
app.post("/get_user_comments", get_user_comments);
app.post("/get_admin_complains", isAdmin, admin_coms);
app.post("/get_complain_by_id", get_complain_by_id);
app.post("/get_cities", cities);

app.post("/statistics", isAdmin, stats);
app.post("/all_users", isAdmin, users);
app.post("/all_emps", isAdmin, emps);
app.post("/change_user_status", isAdmin, change_user_status);

app.listen(3015, () => console.log("first"));
