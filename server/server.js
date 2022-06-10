const express = require("express");
const path = require("path");
const cateNewsRouter = require("./routes/cateNews");
const newsRouter = require("./routes/news.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, token, Access-Control-Allow-Headers,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    return next();
  });

  // connect to mongoDB
let urlData = process.env.DATABASE_URL;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(urlData, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connect successfuly to mongoDB!");
  } catch (error) {
    console.error("connect MongoDB has error: " + error);
  }
};
connectMongoDB();

app.get('/', function(req, res){
    res.send("Hello World");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port: ${port}`));