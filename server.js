const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_config");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const app = express();
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const oauth2 = require("passport-google-oauth2").Strategy;
const User = require("./model/userModel");
const { generateToken } = require("./controllers/userController");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "https://e-backend-zjo7.onrender.com",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("./uploads"));

// setup session
app.use(
  session({
    secret: "abd360degree",
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new oauth2(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboardgoogle",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/success", async (req, res) => {
  // console.log("reqqqqq", req.user);
  if (req.user) {
    res.status(200).json({ msg: "user login", user: req.user });
  } else {
    res.status(400).json({ message: "not authorized" });
  }
});

app.use("/api/auth", require("./routers/userRoutes"));
app.use("/api/data", require("./routers/dataRoutes"));
app.use("/api/admin", require("./routers/adminRoutes"));
app.use("/api/product", require("./routers/productRoutes"));

app.get("/", (req, res) => {
  res.send("welcome to Ecommerce API");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});