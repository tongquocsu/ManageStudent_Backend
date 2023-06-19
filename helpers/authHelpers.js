import bcrypt from "bcrypt";
import accountModel from "../models/accountModel.js";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const validateInputs = async (username, email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-z0-9]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email",
    };
  }

  const existUser = await accountModel.findOne({ email });
  if (existUser) {
    return {
      success: false,
      message: "Email has been taken",
    };
  }

  if (!usernameRegex.test(username)) {
    return {
      success: false,
      message: "Invalid username",
    };
  }

  const existUserName = await accountModel.findOne({ username });
  if (existUserName) {
    return {
      success: false,
      message: "Username has been taken",
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "Confirm your password have 8 characters at least 1 upper case, 1 number inside",
    };
  }

  return {
    success: true,
    message: "Inputs are valid",
  };
};
