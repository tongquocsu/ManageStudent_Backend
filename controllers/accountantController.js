import mongoose from "mongoose";
import accountantModel from "../models/accountantModel.js";
import accountModel from "../models/accountModel.js";
import { hashPassword, validateInputs } from "../helpers/authHelpers.js";

export const createAccountantController = async (req, res) => {
  try {
    // Lấy thông tin từ body request
    const { name, username, email, password } = req.body;

    // Kiểm tra email đã tồn tại hay chưa
    const existEmail = await accountModel.findOne({ email });

    if (existEmail) {
      return res.status(200).send({
        success: true,
        message: "Email has been taken",
      });
    }

    //Kiểm tra tính duy nhất của username, email. Kiểm tra cú pháp của email, username, password
    const validation = await validateInputs(username, email, password);
    if (!validation.success) {
      return res.status(400).send({
        success: false,
        message: validation.message,
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Tạo một tài khoản mới cho accountant
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "accountant",
    });

    // Tạo một kế toán mới
    const accountant = new accountantModel({
      name,
      account: account._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, kế toán trong một giao dịch
      await account.save({ session });
      await accountant.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "Accountant account created successfully",
        accountant,
        account,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error creating accountant account",
    });
  }
};

export const getAllAccountantsController = async (req, res) => {
  try {
    // Lấy tất cả accountants từ database
    const accountants = await accountantModel.find().populate("account");

    res.status(200).send({
      success: true,
      message: "Get accountants list",
      accountants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving accountants",
    });
  }
};

export const deleteAccountantController = async (req, res) => {
  try {
    const accountantId = req.params.acid;

    // Xóa accountant dựa trên accountantId
    const accountant = await accountantModel.findById(accountantId);

    if (!accountant) {
      return res.status(404).send({
        success: false,
        message: "Accountant not found",
      });
    }

    // Xóa thông tin liên quan đến accountant
    await accountModel.findByIdAndDelete(accountant.account);

    // Xóa accountant
    await accountantModel.findByIdAndDelete(accountantId);

    res.status(200).send({
      success: true,
      message: "Accountant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting Accountant",
    });
  }
};

export const updateAccountantController = async (req, res) => {
  try {
    const accountantId = req.params.acid;

    const accountant = await accountantModel.findById(accountantId);

    const currentEmail = accountant.account.email;
    const currentUsername = accountant.account.username;
    const { name, username, email, password } = req.body;

    //Kiểm tra tính duy nhất của username, email. Kiểm tra cú pháp của email, username, password
    const validation = await validateInputs(
      username,
      email,
      password,
      currentEmail,
      currentUsername,
      accountant.account._id
    );

    if (!validation.success) {
      return res.status(400).send({
        success: false,
        message: validation.message,
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Kiểm tra accountant có tồn tại hay không
    if (!accountant) {
      return res.status(404).send({
        success: false,
        message: "Accountant not found",
      });
    }

    // Cập nhật thông tin accountant
    await accountantModel.findByIdAndUpdate(accountantId, {
      $set: {
        name,
      },
    });

    //Cập nhật tài khoản accountant
    await accountModel.findByIdAndUpdate(accountant.account, {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Lấy thông tin accountant đã cập nhật
    const updatedAccountant = await accountantModel
      .findById(accountantId)
      .populate("account");

    res.status(200).send({
      success: true,
      message: "Accountant information updated successfully",
      accountant: updatedAccountant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating accountant information",
    });
  }
};

export const getAccountantInfoController = async (req, res) => {
  try {
    const accountantId = req.params.acid;

    // Kiểm tra accountant có tồn tại hay không
    const accountant = await accountantModel
      .findById(accountantId)
      .populate("account");
    if (!accountant) {
      return res.status(404).send({
        success: false,
        message: "Accountant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get accountant information",
      accountant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving accountant information",
    });
  }
};
