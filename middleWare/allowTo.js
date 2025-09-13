module.exports = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ status: "error", msg: "forbidden" });
    }
    next();
  };
};
