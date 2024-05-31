const errorHandler = require("express-async-handler");
const User = require("../model/userModel");
const Data = require("../model/dataModel");

const getDatas = errorHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);
  //   console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const data = await Data.find({ user: req.user.id });
  if (!data) {
    res.status(404);
    throw new Error("data not found");
  }
  // console.log(data);
  res.status(200).json(data);
  // res.send("success");
});

const addDatas = errorHandler(async (req, res) => {
  const { name, job, age } = req.body;
  if (!name || !job || !age) {
    res.status(400);
    throw new Error("please fill all details");
  } 
  //   get user id from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const data = await Data.create({
    name,
    job,
    age,
    user: req.user.id,
    // status: "new",
  });
  //   console.log(data)
  res.status(200).json(data);
});

const getData = errorHandler(async (req, res) => {
  //   get user id from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const data = await Data.findById(req.params.id);
  if (!data) {
    res.status(404);
    throw new Error("data not found");
  }
  if (data.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("you are unauthorized");
  }
  res.status(200).json(data);
});

const deleteData = errorHandler(async (req, res) => {
  //   get user id from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const data = await Data.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("data not found");
  }

  if (data.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("your unauthorized");
  }

  const deletedData = await Data.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "deleted" });
  // res.redirect("/getDatas");
});

// const updatedata = errorHandler(async (req, res) => {
//   //   get user id from jwt
//   const user = await User.findById(req.user.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("user not found");
//   }

//   const data = await data.findById(req.params.id);
//   if (!data) {
//     res.status(404);
//     throw new Error("data not found");
//   }

//   if (data.user.toString() !== req.user.id) {
//     res.status(400);
//     throw new Error("your unAuthourized");
//   }

//   const updateddata = await data.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updateddata);
// });

module.exports = {
  getDatas,
  addDatas,
  getData,
  deleteData,
  // updatedata,
};
