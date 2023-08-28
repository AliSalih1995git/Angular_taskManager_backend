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
  console.log("Entering getAll task route");
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

exports.singleTask = async (req, res) => {
  const taskId = req.params.taskId;
  console.log("Entering single task route");

  try {
    const task = await TaskModel.findById(taskId).populate(
      "assignedTo",
      "userName"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.singleTaskHome = async (req, res) => {
  const taskId = req.params.taskId;
  console.log("Entering single task home route");

  try {
    const task = await TaskModel.findById(taskId).populate(
      "assignedTo",
      "userName"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
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
    const { title, description, date, priority, status, userName } = req.body;
    const newTask = new TaskModel({
      title,
      description,
      dueDate: new Date(date),
      priority,
      status,
      assignedTo: userName,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateTask = async (req, res) => {
  console.log("Enter update task route");
  console.log(req.body, "req.body");
  const updateData = {
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.date),
    priority: req.body.priority,
    status: req.body.status,
    assignedTo: req.body.userName,
  };

  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      updateData,
      {
        new: true,
      }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  console.log("Enter updateTaskStatus route");
  try {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    const task = await TaskModel.findOne({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      { $set: { status: newStatus } },
      { new: true }
    );
    console.log(updatedTask, "task");
    res.status(200).json({ message: "Task Updated successfully" });
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
