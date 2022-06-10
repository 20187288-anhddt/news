const express = require("express");

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

app.get('/', function(req, res){
    res.send("Hello World");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port: ${port}`));