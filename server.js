const express = require("express");
require("dotenv").config();
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

const connectDatabase = require("./config/config");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

const port = process.env.PORT;
connectDatabase();
app.listen(port, () => console.log(`Server running at port ${port}`));
