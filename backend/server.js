require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({
  secret: "oauthsecret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* ======================
   DATABASE
====================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ======================
   USER MODEL
====================== */
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  provider: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

const User = mongoose.model("User", UserSchema);

/* ======================
   JWT
====================== */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ======================
   EMAIL TRANSPORTER
====================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ======================
   REGISTER
====================== */
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      provider: "email"
    });

    const token = generateToken(user);

    res.json({ token, fullName, email });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   LOGIN
====================== */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      fullName: user.fullName,
      email: user.email
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   FORGOT PASSWORD
====================== */
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ message: "If email exists, reset link sent" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click below to reset:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>Expires in 15 minutes</p>
      `
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email sending failed" });
  }
});

/* ======================
   RESET PASSWORD
====================== */
app.post("/api/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch {
    res.status(500).json({ message: "Reset failed" });
  }
});

/* ======================
   GOOGLE OAUTH
====================== */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (_, __, profile, done) => {

  let user = await User.findOne({ email: profile.emails[0].value });

  if (!user) {
    user = await User.create({
      fullName: profile.displayName,
      email: profile.emails[0].value,
      provider: "google"
    });
  }

  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* ======================
   GOOGLE ROUTES
====================== */
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

/* ======================
   PROTECTED ROUTE
====================== */
app.get("/api/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      provider: user.provider
    });

  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

/* ======================
   SERVER
====================== */
app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
