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
    if (!role) {
      return res.send({ error: "Role is Required" });
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
    const { email, password } = req.body;
    //form login
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Check your email or password ",
      });
    }

    const user = await accountModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Check your email",
      });
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
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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
    const { name, email, password, address, phone } = req.body;
    const accountTarget = await accountModel.findById(req.params.aid);
    //password
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
      case !password:
        return res.status(500).send({ error: "Password is Required" });
      case password.length < 6:
        return res.status(500).send({ error: "Required 6 digits" });
      case !phone:
        return res.status(500).send({ error: "Phone is Required" });
      case !role:
        return res.status(500).send({ error: "role is Required" });
      case !address:
        return res.status(500).send({ error: "Address is Required" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedAccount = await accountModel.findByIdAndUpdate(
      req.account._id,
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
      message: "Error while update account",
      error,
    });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    await accountModel.findByIdAndDelete(req.params.aid);

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
