const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessed = jwt.verify(token, process.env.JWT_SECRET);

    if (accessed.role !== "user") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    req.user = accessed;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
