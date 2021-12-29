const e = require("express");
const mysqlConnection = require("../db/db");
const { post } = require("../routes/user");

exports.selectAllPosts = (req, res) => {
  mysqlConnection.query("SELECT * FROM Posts", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

exports.selectOnePost = (req, res) => {
  let id_posts = req.params.id_posts;
  mysqlConnection.query(
    "SELECT * FROM Posts WHERE id_posts = ?",
    [id_posts],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_posts: ${id_posts}`);
};

exports.insertOnePost = (req, res) => {
  let id_users = req.params.id_users;
  let posts = req.body;
  let sql = `INSERT INTO Posts (id_users, img, title, description) VALUES(${id_users}, ?, ?, ?)`;

  posts.img = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  console.log(posts.img);
  mysqlConnection.query(
    sql,
    [posts.img, posts.title, posts.description],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users}`);
  console.log(req.body);
};

exports.modifyOnePost = (req, res) => {
  let id_users = req.params.id_users;
  let id_posts = req.params.id_posts;
  let posts = req.body;
  let sql = `UPDATE Posts SET img = ?, title = ?, description = ? WHERE id_posts = ${id_posts}`;

  posts.img = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  mysqlConnection.query(
    sql,
    [posts.img, posts.title, posts.description],
    (err, rows, fields) => {
      if (!err) {
        res.send("Update successfully");
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users} id_posts: ${id_posts}`);
  console.log(req.body);
};

exports.deleteOnePost = (req, res) => {
  let id_users = req.params.id_users;
  let id_posts = req.params.id_posts;
  mysqlConnection.query(
    "DELETE FROM Posts WHERE id_posts = ?",
    [id_posts],
    (err, rows, fields) => {
      if (!err) {
        res.send("Delete successfully");
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users} id_posts: ${id_posts}`);
  console.log(req.body);
};
