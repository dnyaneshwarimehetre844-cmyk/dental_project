//All in one
var express = require("express");
var app = express();
var session = require("express-session");
var fileupload = require("express-fileupload");

//middlware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  }),
);

var web = require("./Routes/web.js");
var admin = require("./Routes/admin.js");

app.use("/", web);
app.use("/admin", admin);

app.listen(3000);
