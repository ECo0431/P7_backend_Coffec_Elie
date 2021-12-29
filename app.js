const express = require("express");
const app = express();
const usersRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const remarksRoutes = require("./routes/remarks");
const path = require("path");

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://127.0.0.1:8020",
    "http://localhost:3000",
    "http://127.0.0.1:9000",
    "http://localhost:3001",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8020");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(express.json());

app.listen("3000", () => {
  console.log("Server started on port 3000");
});

app.use("/api", usersRoutes, postsRoutes, remarksRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));
