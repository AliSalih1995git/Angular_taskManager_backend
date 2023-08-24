const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error conecting to DB", error));
};
module.exports = connectDatabase;
