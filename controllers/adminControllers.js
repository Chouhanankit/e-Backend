const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Data = require("../model/dataModel");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password").select("-isAdmin");
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  res.status(200).json(user);
});

const getAllData = asyncHandler(async (req, res) => {
  const data = await Data.find();
  if (!data) {
    res.status(401);
    throw new Error("ticket not found");
  }

  res.status(200).json(data);
});

module.exports = {
  getAllUser,
  getAllData,
};
