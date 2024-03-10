import pool from "../../config.js";

import { Vonage } from "@vonage/server-sdk";

const vonage = new Vonage({
  apiKey: "339640cf",
  apiSecret: "EiFCNdBmvsulOFs8",
});
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const verify = async (req, res) => {
  try {
    let message;
    const { phone, code } = req.body;
    const { rows } = await pool.query(
      ` select code , code_time , phone , (current_timestamp - code_time <= interval '1 minute') as valid_delta
       from public.users where phone = ($1) `,
      [phone]
    );
    if (code === rows[0]?.code && rows[0]?.valid_delta) {
      const verify_user = await pool.query(
        ` update public.users set phone_verified = true where phone = ($1) `,
        [phone]
      );
      message = "تم التحقق من رقم الهاتف بنجاح";
    } else {
      message = "كلمة السر المؤقتة غير صالحة من فضلك حاول مرة اخري";
    }
    res.send({ message: message });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
};

export const generate_new_code = async (req, res) => {
  try {
    const { phone } = req.body;
    const from = "Vonage APIs";
    const to = phone;
    const code = generateRandomNumber();
    const text = "Your code is " + code;
    const update_code = await pool.query(
      ` update public.users set code = ($1) where phone = ($2) `,
      [code, phone]
    );
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });
    res.send({ message: "code updated succefully" });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
};

export const register_user = async (req, res) => {
  try {
    const d = req.body;
    const from = "Vonage APIs";
    const to = d.phone;
    const code = generateRandomNumber();
    const text = "Your code is " + code;
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });
    const { rows } = await pool.query(
      ` INSERT INTO public.users(
	user_name, password,user_type , city_id ,  passport ,  phone , last_name , code,code_time)
	VALUES ( ($1), ($2) , 1 , ($3) ,($4) , ($5) , ($6) , ($7) , current_timestamp ); `,
      [
        d.user_name,
        d.password,
        d.city_id,
        d.passport,
        d.phone,
        d.last_name,
        code,
      ]
    );

    res.send({ message: "sucseess" });
  } catch (e) {
    res.send({ "error ": e });
  }
};
