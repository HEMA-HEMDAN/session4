const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/genarateTokens");
const getAllUsers = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const users = await userModel
      .find({}, { _id: 0, __v: 0, password: 0 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({ status: "ok", data: { users } });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error getting users" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.file);

    const matchUser = await userModel.findOne({ email });
    if (matchUser) {
      return res.status(400).json({
        status: "error",
        message: "this email is already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = await jwt({ email, role });
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      token,
      role,
      avatar: req.file.filename,
    });

    res.status(201).json({ status: "ok", data: { user } });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", msg: "invalid password" });
    }
    const token = await jwt({ email, role: user.role });

    res.status(200).json({ status: "ok", data: { token } });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

module.exports = { getAllUsers, registerUser, loginUser };
