const express = require("express");
const userControler = require("../controler/users-controller");
const verifyToken = require("../middleWare/verifyToken");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileNama = "user-" + Date.now() + "-" + file.originalname;
    cb(null, fileNama);
  },
});

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const Router = express.Router();
Router.route("/").get(verifyToken, userControler.getAllUsers);
Router.route("/register").post(
  upload.single("avatar"),
  userControler.registerUser
);
Router.route("/login").post(userControler.loginUser);
module.exports = Router;
