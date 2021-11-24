// USER Route
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

//@POST Route
//@DESC USER Signup
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // If user Exists
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "This user Already Exists!" });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

//@GET Route
//@DESC Get Logged in user's Info
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
