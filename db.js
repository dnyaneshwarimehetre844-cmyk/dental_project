var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createConnection({
  host: "bjiregkijl0gvrbb0wf9-mysql.services.clever-cloud.com",
  user: "u7m23vcksfx6rvbi",
  password: "0begvLzgDiUyv7zD6meW",
  database: "bjiregkijl0gvrbb0wf9",
});
var exe = util.promisify(conn.query).bind(conn);
module.exports = exe;
