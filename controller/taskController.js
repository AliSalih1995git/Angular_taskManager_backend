const TaskModel = require("../models/TaskModel");

exports.getAllTasks = async (req, res) => {
  console.log("Entering getAll task route");
  try {
    const tasks = await TaskModel.find().populate("assignedTo", "userName");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// each users All task
exports.singleUserTask = async (req, res) => {
  const userId = req.user.userId;
  console.log(req.user, "Entering getAll task route");
  try {
    const tasks = await TaskModel.find({ assignedTo: userId }).populate(
      "assignedTo",
      "userName"
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, priority, assignedTo } = req.body;
    console.log(req.body);
    const newTask = new TaskModel({
      title,
      description,
      dueDate: Date.now(),
      priority,
      assignedTo,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateTask = async (req, res) => {
  console.log("Enter update task route");
  try {
    const taskId = req.params.taskId;
    console.log(req.body.status);

    const task = await TaskModel.findOneAndUpdate({
      _id: taskId,
      status: req.body.status,
    });

    res.status(200).json({ message: "Task Updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await TaskModel.findOneAndDelete({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
