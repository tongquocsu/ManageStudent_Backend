import mongoose from "mongoose";
import adminModel from "../models/adminModel.js";
import accountModel from "../models/accountModel.js";
import { hashPassword, validateInputs } from "../helpers/authHelpers.js";

export const createAdminController = async (req, res) => {
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

    // Tạo một tài khoản mới cho admin
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    // Tạo một account mới
    const admin = new adminModel({
      name,
      account: account._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, admin trong một giao dịch
      await account.save({ session });
      await admin.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "Admin account created successfully",
        admin,
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
      message: "Error creating admin account",
    });
  }
};

export const getAllAdminsController = async (req, res) => {
  try {
    // Lấy tất cả admin từ database
    const admins = await adminModel.find().populate("account");

    res.status(200).send({
      success: true,
      message: "Get parents list",
      admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving admins",
    });
  }
};

export const deleteAdminController = async (req, res) => {
  try {
    const adminId = req.params.aid;

    // Xóa admin dựa trên adminId
    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    // Xóa thông tin liên quan đến admin
    await accountModel.findByIdAndDelete(admin.account);

    // Xóa admin
    await adminModel.findByIdAndDelete(adminId);

    res.status(200).send({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting Admin",
    });
  }
};

export const updateAdminController = async (req, res) => {
  try {
    const adminId = req.params.aid;

    const admin = await adminModel.findById(adminId);

    const { name, username, email, password } = req.body;

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

    // Kiểm tra admin có tồn tại hay không
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    // Cập nhật thông tin admin
    await adminModel.findByIdAndUpdate(adminId, {
      $set: {
        name,
      },
    });

    //Cập nhật tài khoản admin
    await accountModel.findByIdAndUpdate(admin.account, {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Lấy thông tin admin đã cập nhật
    const updatedAdmin = await adminModel.findById(adminId).populate("account");

    res.status(200).send({
      success: true,
      message: "Admin information updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating admin information",
    });
  }
};

export const getAdminInfoController = async (req, res) => {
  try {
    const adminId = req.params.aid;

    // Kiểm tra admin có tồn tại hay không
    const admin = await adminModel.findById(adminId).populate("account");
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get admin information",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving admin information",
    });
  }
};
