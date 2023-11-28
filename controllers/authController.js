import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import crypto from "crypto";
import passwordComplexity from 'joi-password-complexity';
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(
  "9805153579-gqt9m66rm0g27vprujn4ss31hmpav9ln.apps.googleusercontent.com"
);

// user registration
export const register = async (req, res) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      avatar: req.body.avatar,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      followed: [],
      readingHistory: [],
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "successfully created",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    //if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //if user is exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc;
    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        token,
        message: "Successfully login",
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// admin registration
export const adminRegister = async (req, res) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      avatar: req.body.avatar,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      role: "admin",
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  const { email, email_verified, username, picture } = req.body;
  try {
    if (email_verified) {
        const user = await User.findOne({email});
      if (user) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );
        const { password, role, ...rest } = user._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
          })
          .status(200)
          .json({
            success: true,
            token,
            message: "Successfully login",
            data: { ...rest },
            role,
          });
      } else {
        let newPassword = email + process.env.JWT_SECRET_KEY;
        const newUser = new User({
          username: username,
          email: email,
          password: newPassword,
          avatar: picture,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          followed: [],
          readingHistory: [],
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
        const { password, role ,...rest } = newUser._doc;
        res
          .cookie("accessToken", token, { httpOnly: true, expires: token.expiresIn })
          .status(200)
          .json({ success: true, token, message: "Successfully logged in", data: { ...rest }, role });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const forgotPassword = async (req, res) =>{
  try {
    const { email } = req.body.email
    if(!email){
        return res
          .status(404)
          .json({ success: false, message: "Vui lòng nhập email của bạn!!!" });
    }
    const user = await User.findOne({ email })
    if(!user){
      return res
      .status(404)
      .json({ success: false, message: "User not found, invalid request!!!" });
    }
    res
    .status(200)
    .send({ message: "Password reset link sent to your email account" });
} catch (error) {
  res.status(500).send(error.message);
}
}
