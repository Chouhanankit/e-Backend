const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please add  name"],
    },
    email: {
      type: String,
      require: [true, "please add email"],
      unique: true,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      require: [true, "please add password"],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
