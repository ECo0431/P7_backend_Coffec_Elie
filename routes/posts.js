const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.get("/posts", auth, postsCtrl.selectAllPosts);
router.get("/posts/:id_posts", auth, postsCtrl.selectOnePost);
router.post("/users/:id_users/posts", auth, multer, postsCtrl.insertOnePost);
router.put(
  "/users/:id_users/posts/:id_posts",
  auth,
  multer,
  postsCtrl.modifyOnePost
);
router.delete(
  "/users/:id_users/posts/:id_posts",
  auth,
  postsCtrl.deleteOnePost
);

module.exports = router;
