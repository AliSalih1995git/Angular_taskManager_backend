const router = require("express").Router();
const {
  blockUser,
  unblockUser,
  getAllUsers,
  deleteUser,
} = require("../controller/admin Controller");
const { register, login } = require("../controller/authController");
const adminAuth = require("../middleware/adminAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/", adminAuth, getAllUsers);
router.put("/block/:userId", adminAuth, blockUser);
router.put("/unblock/:userId", adminAuth, unblockUser);
router.delete("/:userId", adminAuth, deleteUser);

module.exports = router;
