const { response } = require("express");
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// Get All User
const getAll = async (req, res, next) => {
  try {
    const users = await User.paginate(
      {},
      { page: req.query.page, limit: req.query.limit }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get User By ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Register
const register = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Username!");

    const originalPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJs.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Password!");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1800s" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {}
};

const deleteUser = (req, res, next) => {
  let id = req.body.id;
  User.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: "User deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    const oldPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJs.enc.Utf8);

    console.log(oldPassword == req.body.oldPassword);

    if (oldPassword !== req.body.oldPassword) {
      res.status(401).json("Wrong Password!");
      return;
    }

    console.log("lanjut");

    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString();
    }

    const updatedData = {
      username: req.body.username,
      password: req.body.password,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Search Users
const searchUsers = async (req, res, next) => {
  const username = req.body.username || "";
  try {
    const searchedUsers = await User.paginate(
      {
        username: { $regex: new RegExp(username.toLowerCase(), "i") },
      },
      { page: req.query.page, limit: req.query.limit }
    );
    res.status(200).json(searchedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getUserById,
  register,
  login,
  deleteUser,
  updateUser,
  searchUsers,
};
