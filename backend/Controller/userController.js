const Account = require("../Model/balanceModel");
const User = require("../Model/userModel");
const { generateToken } = require("../Utils/jsonWebToken");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(200).json({
        status: "fail",
        message: "user already exist with this username",
      });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      staus: "success",
      token,
      newUser,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).select("password");
    if (!user) {
      return res.status(404).json({
        staus: "fail",
        message: "user not found",
      });
    }

    if (!(await user.correctPassword(req.body.password, user.password))) {
      return res.status(404).json({
        status: "fail",
        message: "invalid Credentials",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({ 
      status: "success",
      token,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      error : error.message 
    })
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(404).json({
        status: "fail",
        message: "you are not logged In. Please logged in again",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRETJWTTOKEN);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

const queryUsers = async (req, res) => {
  
  

  const allUser = await User.find({
    // ! $options: 'i'  , ensures that the filter matches firstName or lastName values regardless of their case Senstitive
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  console.log(allUser);
  return res.status(200).json({
    status: "success",
    allUser,
  });
};

module.exports = {
  signUp,
  signIn,
  protect,
  queryUsers,
  queryUsers,
};
