const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/userModel");

const REQUIRED_CREDENTIALS_MESSAGE = "Email and password are required";
const INVALID_CREDENTIALS_MESSAGE = "Invalid credentials";

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

function validateCredentials(email, password) {
  return Boolean(email && password);
}

async function register(req, res) {
  const { email, password } = req.body;

  if (!validateCredentials(email, password)) {
    return res.status(400).json({ message: REQUIRED_CREDENTIALS_MESSAGE });
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  const token = signToken(user);

  return res.status(201).json({
    message: "User registered successfully",
    token
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!validateCredentials(email, password)) {
    return res.status(400).json({ message: REQUIRED_CREDENTIALS_MESSAGE });
  }

  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: INVALID_CREDENTIALS_MESSAGE });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res.status(401).json({ message: INVALID_CREDENTIALS_MESSAGE });
  }

  const token = signToken(user);

  return res.json({
    message: "Login successful",
    token
  });
}

module.exports = {
  register,
  login
};
