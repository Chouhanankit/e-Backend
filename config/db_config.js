const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("database connect successfully");
  } catch (error) {
    console.log("database not connected");
  }
};

module.exports = connectDB;
