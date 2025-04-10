const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user already exist",
        success: false,
      });
    }
    const userModel = new UserModel({
      name,
      email,
      password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({
      message: "u are singed up",
      success: "true",
    });
  } catch (err) {
    res,
      status(500).json({
        message: "incorrect data plz singup again",
        success: false,
      });
  }
};
const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "user not already exist",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(409).json({
        message: "passowrd inncorrect try again",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "u are singed in",
      jwtToken,
      success: "true",
      email,
      name:user.name
    });
  } catch (err) {
    res,
      status(500).json({
        message: "incorrect data plz login again",
        success: false,
      });
  }
};

module.exports = { login, signup };
