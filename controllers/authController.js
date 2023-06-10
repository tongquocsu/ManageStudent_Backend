import accountModel from "../models/accountModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    //validations
    if (!username) {
      return res.send({ error: "Username is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    //check user
    const existUser = await accountModel.findOne({ email, username });
    //exist user
    if (existUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new accountModel({
      username,
      email,
      role,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Register func",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //form login
    if ((!username && !email) || !password) {
      return res.status(404).send({
        success: false,
        message: "Check your username, email or password!",
      });
    }

    // const user = await accountModel.findOne({ $or: [{ email }, { username }] });
    // if (!user) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Check your email",
    //   });
    // }

    let user;
    if (email) {
      user = await accountModel.findOne({ email });
    } else if (username) {
      user = await accountModel.findOne({ username });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "login success",
      user: {
        username: username ? user.username : undefined,
        email: email ? user.email : undefined,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when login",
      error,
    });
  }
};

//export default { registerController };
