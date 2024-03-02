export const isEmployee = (req, res, next) => {
  if (req.user.user_type === "2") {
    next();
  } else res.send({ message: "not authorized" });
};

export const isAdmin = (req, res, next) => {
  if (req.user.user_type === "3") {
    next();
  } else res.send({ message: "not authorized" });
};
