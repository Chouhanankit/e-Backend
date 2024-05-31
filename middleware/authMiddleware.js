const authMiddleware = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = authMiddleware(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      //   verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // get user from token
      req.user = await User.findById(decode.id).select("-password");
      if (!req.user) {
        res.status(400);
        throw new Error("you are not authorized");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("token not found");
    }
    if (!token) {
      res.status(400);
      throw new Error("you are not authorized");
    }
  }
});

module.exports = { protect };
