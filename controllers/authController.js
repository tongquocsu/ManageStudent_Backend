import accountModel from "../models/accountModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    //check user
    const existUser = await accountModel.findOne({ email });
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
      name,
      email,
      phone,
      address,
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
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(404).send({
        success: false,
        message: "Check your email/username or password",
      });
    }

    // Kiểm tra xem emailOrUsername là email hay username
    const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);

    // Tìm tài khoản dựa trên email hoặc username
    const account = await accountModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Check your email/username",
      });
    }

    const match = await comparePassword(password, account.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await JWT.sign(
      { accountId: account._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login success",
      account: {
        email: account.email,
        username: account.username,
        role: account.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when logging in",
      error,
    });
  }
};

export const getAllAccountsController = async (req, res) => {
  try {
    const Accounts = await accountModel.find({});
    res.json(Accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when get users list",
      error,
    });
  }
};

//Admin update accounts
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const accountTarget = await accountModel.findById(req.account.accountId);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedAccount = await accountModel.findByIdAndUpdate(
      req.account.accountId,
      {
        name: name || accountTarget.name,
        password: hashedPassword || accountTarget.password,
        phone: phone || accountTarget.phone,
        address: address || accountTarget.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Success",
      updatedAccount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error when update profile",
      error,
    });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    await accountModel.findByIdAndDelete(req.params.accountId);

    res.status(200).send({
      success: true,
      message: "Account Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting account",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
