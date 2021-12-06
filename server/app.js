const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Connection = require("./config/db");


// Routes Imports
const advocateRoute = require("./route/advocate");
const noticesRoute = require("./route/notice");
const authRoute = require("./route/auth");

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
Connection();
app.get("/",(req,res)=>{
  res.json("hii API working !!")
})
app.use("/api/v1/advocate", advocateRoute);
app.use("/api/v1/notices", noticesRoute);
app.use("/api/v1/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listen at ${port}`);
});
