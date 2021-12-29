const mysqlConnection = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.selectAllUsers = (req, res) => {
  mysqlConnection.query("SELECT * FROM Users", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

exports.selectOneUser = (req, res) => {
  let id_users = req.params.id_users;
  mysqlConnection.query(
    "SELECT * FROM Users WHERE id_users = ?",
    [id_users],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users}`);
};

exports.loginUser = async (req, res) => {
  let email = req.body.email;
  mysqlConnection.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    (err, rows, fields) => {
      try {
        if (!err) {
          console.log(rows[0].pass);
          bcrypt.compare(req.body.pass, rows[0].pass).then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            const result = {
              userId: rows[0].id_users,
              token: jwt.sign(
                { userId: req.body.id_users },
                "RANDOM_TOKEN_SECRET",
                { expiresIn: "24h" }
              ),
            };
            //Affiche le status 201 et le token dans postman
            res.status(201).json(result);
            console.log(result);
          });
          // .catch(error => res.status(500).json({ error }));
        } else {
          console.log("email NOK");
        }
      } catch (error) {
        console.log("ok");
        res.status(500).json({ error });
      }
    }
  );
};

exports.registerUsers = async (req, res) => {
  let users = req.body;
  let sql = `INSERT INTO Users (pseudo, email, pass) VALUES(?, ?, ?)`;
  const pass = req.body.pass;

  try {
    let hash = await bcrypt.hash(pass, await bcrypt.genSalt(10));

    mysqlConnection.query(
      sql,
      [users.pseudo, users.email, hash],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
    console.log(hash);
  } catch (error) {
    console.log(error.message);
  }

  console.log(req.body);
};

exports.updateUsers = (req, res) => {
  let id_users = req.params.id_users;
  let users = req.body;
  let sql = `UPDATE Users SET pseudo = ?, email = ?, pass = ? WHERE id_users = ${id_users}`;
  mysqlConnection.query(
    sql,
    [users.pseudo, users.email, users.pass, users.id_users],
    (err, rows, fields) => {
      if (!err) {
        res.send("Update successfully");
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users}`);
  console.log(req.body);
};

exports.deleteUsers = (req, res) => {
  let id_users = req.params.id_users;
  mysqlConnection.query(
    "DELETE FROM Users WHERE id_users = ?",
    [id_users],
    (err, rows, fields) => {
      if (!err) {
        res.send("Delete successfully");
      } else {
        console.log(err);
      }
    }
  );
  console.log(`id_users: ${id_users}`);
};
