const express = require("express");
const router = express.Router();
const remarksCtrl = require("../controllers/remarks");
const auth = require("../middlewares/auth");

router.get("/all/remarks", auth, remarksCtrl.selectAllRemarks);
router.get(
  "/posts/:id_posts/remarks",
  auth,
  remarksCtrl.selectAllRemarksOnOnePost
);
router.get(
  "/posts/:id_posts/remarks/:id_remarks",
  auth,
  remarksCtrl.selectOneRemark
);
router.post(
  "/users/:id_users/posts/:id_posts/remarks",
  auth,
  remarksCtrl.insertOneRemark
);
router.put(
  "/users/:id_users/posts/:id_posts/remarks/:id_remarks",
  auth,
  remarksCtrl.modifyOneRemark
);
router.delete(
  "/users/:id_users/posts/:id_posts/remarks/:id_remarks",
  auth,
  remarksCtrl.deleteOneRemark
);

module.exports = router;
