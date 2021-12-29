const mysqlConnection = require("../db/db");

exports.selectAllRemarks = (req, res) => {
  mysqlConnection.query("SELECT * FROM Remarks", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

exports.selectAllRemarksOnOnePost = (req, res) => {
  let id_posts = req.params.id_posts;
  mysqlConnection.query(
    "SELECT * FROM Remarks WHERE id_posts = ?",
    [id_posts],
    (err, rows, filed) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.selectOneRemark = (req, res) => {
  let id_posts = req.params.id_posts;
  let id_remarks = req.params.id_remarks;
  mysqlConnection.query(
    "SELECT * FROM Remarks WHERE id_remarks = ?",
    [id_remarks],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_posts: ${id_posts} id_remarks: ${id_remarks}`);
};

exports.insertOneRemark = (req, res) => {
  let id_users = req.params.id_users;
  let id_posts = req.params.id_posts;
  let remarks = req.body;
  let sql = `INSERT INTO Remarks (id_users, id_posts, remark) VALUES(${id_users}, ${id_posts}, ?)`;
  mysqlConnection.query(sql, [remarks.remark], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
  console.log(`id_users: ${id_users} id_posts: ${id_posts}`);
  console.log(req.body);
};

exports.modifyOneRemark = (req, res) => {
  let id_users = req.params.id_users;
  let id_posts = req.params.id_posts;
  let id_remarks = req.params.id_remarks;
  let remarks = req.body;
  let sql = `UPDATE Remarks SET remark = ? WHERE id_remarks = ${id_remarks}`;
  mysqlConnection.query(sql, [remarks.remark], (err, rows, fields) => {
    if (!err) {
      res.send("Update successfully");
    } else {
      console.log(err);
    }
  });
  console.log(
    `id_users: ${id_users} id_posts: ${id_posts} id_remarks: ${id_remarks}`
  );
  console.log(req.body);
};

exports.deleteOneRemark = (req, res) => {
  let id_users = req.params.id_users;
  let id_posts = req.params.id_posts;
  let id_remarks = req.params.id_remarks;
  mysqlConnection.query(
    "DELETE FROM Remarks WHERE id_remarks = ?",
    [id_remarks],
    (err, rows, fields) => {
      if (!err) {
        res.send("Delete successfully");
      } else {
        console.log(err);
      }
    }
  );
  console.log(
    `id_users: ${id_users} id_posts: ${id_posts} id_remarks: ${id_remarks}`
  );
  console.log(req.body);
};
