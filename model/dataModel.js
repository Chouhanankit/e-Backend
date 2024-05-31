const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      require: [true, "please add name"],
    },
    job: {
      type: String,
      require: [true, "please add email"],
      // unique: true,
    },
    age: {
      type: Number,
      required: [true, "Please provide your age."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Data", dataSchema);
