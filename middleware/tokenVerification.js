import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "you are not autheticated" });
    return;
  }
  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
    req.user = user;
    next();
    return;
  });
};
