const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["x-auth-token"];

  if (!token) {
    res.status(401).json({
      message: "Token is requried.",
    });
    return;
  }

  if (!token) {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Token is invalid or expired.",
    });
    return;
  }
};
