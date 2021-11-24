const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.json({ msg: "No Token, Authorization Denied!" });
  }
  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ msg: "Token is Not Valid" });
  }
};
