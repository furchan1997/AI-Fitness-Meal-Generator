module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "admin only",
    });
    return;
  }
  next();
};
