const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

//Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/task", require("./routes/api/task"));
app.use("/api/city", require("./routes/api/city"));

app.listen(PORT, () => {
  console.log("Server Started on PORT :", PORT);
});
