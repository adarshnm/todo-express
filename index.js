const express = require("express");
const app = new express();
let mongoose = require("mongoose"),
  path = require("path"),
  cors = require("cors");
const config = require("./config");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.db)
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

const taskRoute = require("./routes/task.route");

const expressSession = require("express-session");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  expressSession({
    name: config.session_id,
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
  })
);
//Passport
const passport = require("passport");
var User = require("./models/user.model");
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const userRoute = require("./routes/user.route");

app.use("/api", taskRoute);
app.use("/auth", userRoute);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// PORT

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
