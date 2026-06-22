var express = require("express");
var router = express.Router();
var query1 = require("../db.js");

router.get("/", async (req, res) => {
  // res.send("Welcome Website Panal");
  var sql = "select * from blog";
  var blog = await query1(sql);
  var ser_sql = "select * from service";
  var service_data = await query1(ser_sql);
  var sql = "select * from faq";
  var faq = await query1(sql);
  res.render("web/index.ejs", {
    blog: blog,
    service: service_data,
    faq: faq,
  });
});
router.post("/book_appointment", async (req, res) => {
  // res.send(req.body);
  var { name, email, service_id, appointment_date } = req.body;
  var sql =
    "insert into appointment_enquiry(name,email,service_id,appointment_date,status)values(?,?,?,?,?)";
  var data = await query1(sql, [
    name,
    email,
    service_id,
    appointment_date,
    "pending",
  ]);
  res.redirect("/");
  // res.send(appointment_date);
});
router.get("/whyus", (req, res) => {
  res.render("web/whyus.ejs");
});
router.get("/whyteam", async (req, res) => {
  // res.send("Welcome Website Panal");
  var sql = "select * from whyteam";
  var whyteam = await query1(sql);
  res.render("web/whyteam.ejs", { whyteam: whyteam });
});
router.get("/service", async (req, res) => {
  // res.send("Welcome Website Panal");
  var sql = "select * from service";
  var service = await query1(sql);
  res.render("web/service.ejs", { service: service });
});
router.get("/team", async (req, res) => {
  // res.send("Welcome Website Panal");
  var sql1 = "select * from team";
  var team = await query1(sql1);

  var sql2 = "select * from whyteam";
  var whyteam = await query1(sql2);
  res.render("web/team.ejs", { team: team, whyteam: whyteam });
});
router.get("/Pricing", async (req, res) => {
  // res.send("Welcome Website Panal");

  res.render("web/Pricing.ejs");
});
router.get("/DentalSolutions", async (req, res) => {
  // res.send("Welcome Website Panal");
  var sql = "select * from dentalsolutions";
  var data = await query1(sql);
  // res.send("Welcome Website Panal");

  res.render("web/DentalSolutions.ejs", { data: data });
});
module.exports = router;
