const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const mongoose = require("mongoose");
require("dotenv").config();

//route imports
const authRoutes = require("./routes/auth");

const app = express();

// global middleware
app.use(bodyParser.json());
app.use(cors({origin:"*"}));


app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(8765);
  console.log("Mongoose Server is running at port:8765");
});
