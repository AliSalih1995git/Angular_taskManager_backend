const UserModel = require("../models/UserModel");

// admin can block user

exports.blockUser = async (req, res) => {
  console.log("enter block route");
  try {
    const userId = req.params.userId;
    console.log(userId);

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { blocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// admin can unblock user

exports.unblockUser = async (req, res) => {
  console.log("enter unbloack router");
  try {
    const userId = req.params.userId;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { blocked: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get all Users

exports.getAllUsers = async (req, res) => {
  console.log("Enter getAllusers route");

  try {
    const currentUser = req.admin;

    const users = await UserModel.find({
      _id: { $ne: currentUser._id },
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
