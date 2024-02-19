import { Router } from "express";
import pool from "../config.js";
import { NlpManager } from "node-nlp";

const requestRouter = Router();

requestRouter.get("/get_requests", (req, res) => {
  console.log(req.user, "this is user ");
  res.send("hello all");
});

requestRouter.get("/get_pages", async (req, res) => {
  const { rows } = await pool.query(
    `select * from "Test".users_services us join "Test".services s on us.service_id = s.id where us.user_id =($1) `,
    [3]
  );
  const names = rows.map((r) => r.name);
  res.send({ routes: names });
});

const manager = new NlpManager({ languages: ["ar"] });

// Train the manager on the data you want to correct
manager.addDocument("ar", "نص بدون أخطاء", "noErrors");
manager.addDocument("ar", "نص يحتوي على خطأ إملائي", "spellingError");

// Train the manager on expected responses
manager.addAnswer("ar", "noErrors", "النص بدون أخطاء");
manager.addAnswer(
  "ar",
  "spellingError",
  "النص يحتوي على خطأ إملائي. يرجى التحقق."
);

// Train the manager
await manager.train();

// Use the manager to correct the text
async function correctText(text) {
  const response = await manager.process("ar", text);
  console.log(response, "res");
  return response.answer;
}

// Correct the text

requestRouter.post("/add_request", async (req, res) => {
  console.log(req.body);
  res.send("l");
});

export default requestRouter;
