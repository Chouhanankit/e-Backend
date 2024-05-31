const express = require("express");
const { isAuthorized } = require("../middleware/adminMiddleware");
const { getAllData, getAllUser } = require("../controllers/adminControllers");
const router = express.Router();
const multer = require("multer");
const Post = require("../model/postModel");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

router.get("/users", isAuthorized, getAllUser);
router.get("/datas", isAuthorized, getAllData);

// img storage path
const imgconfig = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// user register
router.post(
  "/createpost",
  isAuthorized,
  upload.single("photo"),
  async (req, res) => {
    const { filename } = req.file;
    const { title, desc, price } = req.body;
    if (!title || !desc || !price || !filename) {
      res.status(401).json({ status: 401, message: "fill all the data" });
    }

    try {
      const userdata = new Post({
        title: title,
        desc: desc,
        price: price,
        imgpath: filename,
      });
      const finalData = await userdata.save();
      res.status(200).json(finalData);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// user data get
router.get("/getdata", isAuthorized, async (req, res) => {
  try {
    const getPost = await Post.find();
    res.status(200).json(getPost);
  } catch (error) {
    res.status(404).json({ msg: "user not found" });
  }
});

module.exports = router;