const authMiddleware = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthorized = authMiddleware(async (req, res, next) => {
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
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(400);
        throw new Error("you are not authorized || only admin allowed");
      }
    } catch (error) {
      res.status(401);
      throw new Error("not authorized || no token found");
    }
    if (!token) {
      res.status(400);
      throw new Error("not authorized");
    }
  }
});

module.exports = { isAuthorized };
