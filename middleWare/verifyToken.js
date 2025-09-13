const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["hema"].split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ status: "error", msg: "not authorized1" });
  }
  const token = authHeader;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ status: "error", msg: error.message });
  }
};
module.exports = verifyToken;
