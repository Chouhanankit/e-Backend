const errorHandler = require("express-async-handler");
const User = require("../model/userModel");
const Post = require("../model/postModel");
const { prependOnceListener } = require("../model/dataModel");

const getProduct = errorHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);
  //   console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const post = await Post.find();
  if (!post) {
    res.status(404);
    throw new Error("data not found");
  }
  // console.log(data);
  res.status(200).json(post);
  // res.send("success");
});

const getSingleProduct = errorHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);
  //   console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("data not found");
  }
  // console.log(data);
  res.status(200).json(post);
  // res.send("success");
});

const getDeleteProduct = errorHandler(async (req, res) => {
  //   get user id from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("post not found");
  }

  // if (data.user.toString() !== req.user.id) {
  //   res.status(400);
  //   throw new Error("your unauthorized");
  // }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getProduct,
  getSingleProduct,
  getDeleteProduct,
};
