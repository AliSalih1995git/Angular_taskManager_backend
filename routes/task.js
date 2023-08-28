const router = require("express").Router();
const { register, login } = require("../controller/authController");
const {
  getAllTasks,
  createTask,
  deleteTask,
  singleUserTask,
  updateTask,
  updateTaskStatus,
  singleTask,
  singleTaskHome,
} = require("../controller/taskController");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

router.get("/", adminAuth, getAllTasks);
router.post("/", adminAuth, createTask);
router.get("/singleUserTask", userAuth, singleUserTask);
router.patch("/:taskId", userAuth, updateTaskStatus);
router.get("/singleTask/:taskId", adminAuth, singleTask);
router.get("/singleTaskHome/:taskId", userAuth, singleTaskHome);
router.put("/:taskId", adminAuth, updateTask);
router.delete("/:taskId", adminAuth, deleteTask);
module.exports = router;
