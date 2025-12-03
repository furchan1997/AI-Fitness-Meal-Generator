const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
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

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        message: "User not found.",
      });
      return;
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    console.log(decoded);
    next();
  } catch (err) {
    res.status(403).json({
      message: "Token is invalid or expired.",
    });
    return;
  }
};
