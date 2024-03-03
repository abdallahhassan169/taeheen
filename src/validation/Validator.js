export const Validator = (req, res, next) => {
  console.log(req.body, "in validator");
  if (req.body.phone) {
    const phoneRegex = /^[0-9]/;
    if (req.body.phone.length < 10 || !phoneRegex.test(req.body.phone)) {
      res.status(400).json({
        "message-en": "please enter a valid phone",
        "message-ar": "من افضلك ادخل رقم هاتف صحيح",
      });
    }
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
          "message-en": "Invalid email address format.",
          "message-ar": "من فضلك ادخل بريد الكتروني صالح",
        });
      }
    }

    if (req.body.passport) {
      if (
        req.body.passport.length <= 9 ||
        !/^[a-zA-Z0-9]+$/.test(req.body.passport)
      ) {
        return res.status(400).json({
          "message-en": "Invalid passport number format.",
          "message-ar": "من فضلك ادخل رقم هوية صالح",
        });
      }
    }
  }
  next();
};
