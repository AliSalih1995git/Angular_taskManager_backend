const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
var jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("Enter register route");

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const user = await newUser.save();
    res.status(200).json({ message: "Registration successfull,please login" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  console.log("Enter login route");
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials");
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Wrong credentials");

    console.log(user.role, "user.role");
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, message: "Login successfull", token });
  } catch (error) {
    res.status(500).json(error);
  }
};
