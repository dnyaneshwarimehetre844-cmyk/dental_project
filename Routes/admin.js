var express = require("express");
var router = express.Router();
var query1 = require("../db.js");
var path = require("path");
var fs = require("fs");

router.get("/", (req, res) => {
  // res.send("Welcome Website Panal");
  // var sql = "select * from login";
  // var data = await q(sql);
  // res.send(data);
  res.render("admin/login.ejs");
});
router.post("/login_check", async (req, res) => {
  // res.send(req.body);
  var { username, password } = req.body;
  var sql = "select * from login where username=? and password=?";
  var data = await query1(sql, [username, password]);

  if (data) {
    // res.send(data);
    //session
    req.session.lid = data[0].lid;
    req.session.admin_name = data[0].admin_name;
    // res.send(req.session);
    res.redirect("/admin/index");
  } else {
    res.send("data not found");
    res.redirect("/admin");
  }
});
router.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
router.get("/forgot", (req, res) => {
  // res.send("Welcome Website Panal");
  res.render("admin/forgot.ejs");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});
router.get("/index", (req, res) => {
  var name = req.session.admin_name;
  // res.send("Welcome Website Panal");
  // res.send(name);
  res.render("admin/index.ejs", { aname: name });
});
router.get("/DentalSolutions", async (req, res) => {
  var sql = "select * from dentalSolutions";
  var data = await query1(sql);
  // res.send("Welcome Website Panal");
  res.render("admin/DentalSolutions.ejs", { data: data });
});
router.post("/DentalSolutions_save", async (req, res) => {
  // res.send(req.body);
  var { title, desc } = req.body;
  var sql = "insert into dentalSolutions(title,description) values(?,?)";
  var data = await query1(sql, [title, desc]);
  // res.send(data);
  res.redirect("/admin/DentalSolutions");
});
router.get("/DentalSolutions_delete/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "delete from dentalSolutions where ds_id=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/DentalSolutions");
});
router.get("/DentalSolutions_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from dentalSolutions where ds_id=?";
  var data = await query1(sql, [id]);
  res.render("admin/DentalSolutions_edit.ejs", { data: data[0] });
});
router.post("/DentalSolutions_edit_save/:id", async (req, res) => {
  // res.send(req.body);
  var id = req.params.id;
  var { title, desc } = req.body;
  var sql = "update dentalSolutions set title=?,description=? where ds_id=?";
  var data = await query1(sql, [title, desc, id]);
  res.redirect("/admin/DentalSolutions");
});
router.get("/Blog", async (req, res) => {
  var sql = "select * from blog";
  var data = await query1(sql);
  res.render("admin/Blog.ejs", { data: data });
});
router.post("/Blog_save", async (req, res) => {
  var { bdate, btitle, bdesc } = req.body;
  var fname = Date.now() + req.files.bphoto.name;
  var uploadpath = path.join(__dirname, "../", "public/images/" + fname);
  req.files.bphoto.mv(uploadpath);
  var sql = "insert into blog(bdate,btitle,bdesc,bphoto) values(?,?,?,?)";
  var data = await query1(sql, [bdate, btitle, bdesc, fname]);
  res.redirect("/admin/Blog");
});
router.get("/Blog_delete/:id/:img", async (req, res) => {
  var id = req.params.id;
  var img = req.params.img;
  var imgpath = path.join(__dirname, "../", "public/images/" + img);
  fs.unlink(imgpath, (err) => {});
  var sql = "delete from blog where bid=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/Blog");
});
router.get("/Blog_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from blog where bid=?";
  var data = await query1(sql, [id]);
  res.render("admin/Blog_edit.ejs", { data: data[0] });
});
router.post("/Blog_edit_save/:id/:img", async (req, res) => {
  var id = req.params.id;
  var img = req.params.img;
  var { bdate, btitle, bdesc } = req.body;
  if (req.files) {
    // res.send(req.files);
    var newimg = Date.now() + req.files.bphoto.name;
    var uploadpath = path.join(__dirname, "../", "public/images/" + newimg);
    req.files.bphoto.mv(uploadpath);
    var imgpath = path.join(__dirname, "../", "public/images/" + img);
    fs.unlink(imgpath, (err) => {});
  } else {
    // res.send(req.files);
    var newimg = img;
  }
  var sql = "update blog set bdate=?,btitle=?,bdesc=?,bphoto=? where bid=?";
  var data = await query1(sql, [bdate, btitle, bdesc, newimg, id]);
  // res.send(data);
  res.redirect("/admin/Blog");
});
router.get("/service", async (req, res) => {
  var sql = "select * from service";
  var data = await query1(sql);
  res.render("admin/service.ejs", { data: data });
});
router.post("/service_save", async (req, res) => {
  var { stitle, sdesc } = req.body;
  var sql = "insert into service(stitle,sdesc) values(?,?)";
  var data = await query1(sql, [stitle, sdesc]);
  res.redirect("/admin/service");
});
router.get("/service_delete/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "delete from service where sid=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/service");
});
router.get("/service_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from service where sid=?";
  var data = await query1(sql, [id]);
  res.render("admin/service_edit.ejs", { data: data[0] });
});
router.post("/service_edit_save/:id", async (req, res) => {
  var id = req.params.id;
  var { stitle, sdesc } = req.body;
  var sql = "update service set stitle=?,sdesc=? where sid=?";
  var data = await query1(sql, [stitle, sdesc, id]);
  res.redirect("/admin/service");
});

router.get("/team", async (req, res) => {
  var sql = "select * from team";
  var data = await query1(sql);
  res.render("admin/team.ejs", { data: data });
});
router.post("/team_save", async (req, res) => {
  var { ttitle, tdesc } = req.body;
  var fname = Date.now() + req.files.tphoto.name;
  var uploadpath = path.join(__dirname, "../", "public/images/" + fname);
  req.files.tphoto.mv(uploadpath);
  var sql = "insert into team(ttitle,tdesc,tphoto) values(?,?,?)";
  var data = await query1(sql, [ttitle, tdesc, fname]);
  res.redirect("/admin/team");
});
router.get("/team_delete/:id/:img", async (req, res) => {
  var id = req.params.id;
  var img = req.params.img;
  var imgpath = path.join(__dirname, "../", "public/images/" + img);
  fs.unlink(imgpath, (err) => {});
  var sql = "delete from team where tid=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/team");
});
router.get("/team_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from team where tid=?";
  var data = await query1(sql, [id]);
  res.render("admin/team_edit.ejs", { data: data[0] });
});
router.post("/team_edit_save/:id/:img", async (req, res) => {
  var id = req.params.id;
  var img = req.params.img;
  var { ttitle, tdesc } = req.body;
  if (req.files) {
    // res.send(req.files);
    var newimg = Date.now() + req.files.tphoto.name;
    var uploadpath = path.join(__dirname, "../", "public/images/" + newimg);
    req.files.tphoto.mv(uploadpath);
    var imgpath = path.join(__dirname, "../", "public/images/" + img);
    fs.unlink(imgpath, (err) => {});
  } else {
    // res.send(req.files);
    var newimg = img;
  }
  var sql = "update team set ttitle=?,tdesc=?,tphoto=? where tid=?";
  var data = await query1(sql, [ttitle, tdesc, newimg, id]);
  // res.send(data);
  res.redirect("/admin/team");
});

router.get("/whyteam", async (req, res) => {
  var sql = "select * from whyteam";
  var data = await query1(sql);
  // res.send("Welcome Website Panal");
  res.render("admin/whyteam.ejs", { data: data });
});
router.post("/whyteam_save", async (req, res) => {
  // res.send(req.body);
  var { title, description } = req.body;
  var sql = "insert into whyteam(title,description) values(?,?)";
  var data = await query1(sql, [title, description]);
  // res.send(data);
  res.redirect("/admin/whyteam");
});
router.get("/whyteam_delete/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "delete from whyteam where wt_id=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/whyteam");
});
router.get("/whyteam_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from whyteam where wt_id=?";
  var data = await query1(sql, [id]);
  res.render("admin/whyteam_edit.ejs", { data: data[0] });
});
router.post("/whyteam_edit_save/:id", async (req, res) => {
  // res.send(req.body);
  var id = req.params.id;
  var { title, description } = req.body;
  var sql = "update whyteam set title=?,description=? where wt_id=?";
  var data = await query1(sql, [title, description, id]);
  res.redirect("/admin/whyteam");
});
router.get("/appointment_pending", async (req, res) => {
  var sql =
    "select*from appointment_enquiry left join service on appointment_enquiry.service_id=service.sid where appointment_enquiry.status=?";

  // var sql = "select * from appointment_enquiry where status=?";
  var data = await query1(sql, ["pending"]);
  res.render("admin/appointment_pending.ejs", { data: data });
});
router.get("/ap_conf/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "update appointment_enquiry set status=? where aid=?";
  var data = await query1(sql, ["confirm", id]);
  res.redirect("/admin/appointment_pending");
});
router.get("/ap_rej/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "update appointment_enquiry set status=? where aid=?";
  var data = await query1(sql, ["reject", id]);
  res.redirect("/admin/appointment_pending");
});
router.get("/appointment_confirm", async (req, res) => {
  var sql =
    "select*from appointment_enquiry left join service on appointment_enquiry.service_id=service.sid where appointment_enquiry.status=?";
  // var sql = "select * from appointment_enquiry where status=?";
  var data = await query1(sql, ["confirm"]);

  res.render("admin/appointment_confirm.ejs", { data: data });
});
router.get("/appointment_reject", async (req, res) => {
  var sql =
    "select*from appointment_enquiry left join service on appointment_enquiry.service_id=service.sid where appointment_enquiry.status=?";

  // var sql = "select * from appointment_enquiry where status=?";
  var data = await query1(sql, ["reject"]);
  res.render("admin/appointment_reject.ejs", { data: data });
});
router.get("/appointment_search", async (req, res) => {
  // res.send(req.query);
  var from_date = req.query.from_date;
  var to_date = req.query.to_date;
  var status = req.query.status;
  var sql =
    "select * from appointment_enquiry where appointment_date>=? and appointment_date<=? and status=?";
  var data = await query1(sql, [from_date, to_date, status]);
  // res.send(data);
  res.render("admin/appointment_pending.ejs", { data: data });
});
router.get("/faq", async (req, res) => {
  var sql = "select * from faq";
  var data = await query1(sql);
  // res.send(result);
  res.render("admin/faq.ejs", { data: data });
});
router.post("/faq_save", async (req, res) => {
  var { faq_que, faq_ans } = req.body;
  var sql = "insert into faq(faq_que, faq_ans) values(?,?)";
  var data = await query1(sql, [faq_que, faq_ans]);
  res.redirect("/admin/faq");
});
router.get("/faq_delete/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "delete from faq where fid=?";
  var data = await query1(sql, [id]);
  res.redirect("/admin/faq");
});
router.get("/faq_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = "select * from faq where fid=?";
  var data = await query1(sql, [id]);
  res.render("admin/faq_edit.ejs", { data: data[0] });
});
router.post("/faq_edit_save/:id", async (req, res) => {
  // res.send(req.body);
  var id = req.params.id;
  var { faq_que, faq_ans } = req.body;
  var sql = "update faq set faq_que=?,faq_ans=? where fid=?";
  var data = await query1(sql, [faq_que, faq_ans, id]);
  res.redirect("/admin/faq");
});
module.exports = router;
