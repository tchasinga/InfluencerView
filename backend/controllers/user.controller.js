import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();


// Adding a signup for user to the app...
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if(!username || !email || !password){
      res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // Check if the email already exists
    if (await User.findOne({ email })) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists in the database...",
      });
    }

    const result = await newUser.save();

    // Generate a JWT token for user authentication
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...userDetails } = result._doc;

    // Respond with user details and token
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        user: userDetails,
        token,
      },
    });
  } catch (error) {
    next(error);
    res.status(400).json({
      success: false,
      message: "Failed to create a user in your system.",
    });
  }
};




// Adding a signing  for user to the web application...
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      const error = new Error("Password is not correct");
      error.status = 401;
      return next(error);
    }

    // if all is good, user signed in successfully
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...userDetails } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .json({
        user: userDetails,
        success: true,
        message: "User signed in successfully",
        token,
      });
  } catch (error) {
    next(error);
  }
};

// Adding a logout functionality for user...
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};


const userController = {
  signup,
  signin,
};

export default userController;