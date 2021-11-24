const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcryptjs = require("bcryptjs");

//@POST Route
//@DESC User Login
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // If user Exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "This user Does not Exists!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid Credentials!" });
    }

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

module.exports = router;
