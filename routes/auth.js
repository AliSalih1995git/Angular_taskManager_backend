const router = require("express").Router();
const {
  blockUser,
  unblockUser,
  getAllUsers,
} = require("../controller/admin Controller");
const { register, login } = require("../controller/authController");
const adminAuth = require("../middleware/adminAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/", adminAuth, getAllUsers);
router.put("/:userId/block", adminAuth, blockUser);
router.put(":userId/unblock", adminAuth, unblockUser);

module.exports = router;
