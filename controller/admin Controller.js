const UserModel = require("../models/UserModel");

// admin can block user

exports.blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;

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
    const users = await UserModel.find().select("-password");
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
