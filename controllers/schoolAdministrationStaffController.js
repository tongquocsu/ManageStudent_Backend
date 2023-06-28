import mongoose from "mongoose";
import schoolAdminStaffModel from "../models/schoolAdministrationStaffModel.js";
import accountModel from "../models/accountModel.js";
import { hashPassword, validateInputs } from "../helpers/authHelpers.js";

export const createSchoolAdminStaffController = async (req, res) => {
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

    // Tạo một tài khoản mới cho school admin staff
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "schoolStaff",
    });

    // Tạo một school admin staff mới
    const schoolAdminStaff = new schoolAdminStaffModel({
      name,
      account: account._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, school admin staff trong một giao dịch
      await account.save({ session });
      await schoolAdminStaff.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "School Admin Staff account created successfully",
        schoolAdminStaff,
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
      message: "Error creating School Admin Staff account",
    });
  }
};

export const getAllSchoolAdminStaffController = async (req, res) => {
  try {
    // Lấy tất cả school admin staff từ database
    const schoolAdminStaff = await schoolAdminStaffModel
      .find()
      .populate("account");

    res.status(200).send({
      success: true,
      message: "Get school admin staff list",
      schoolAdminStaff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving school admin staff",
    });
  }
};

export const deleteSchoolAdminStaffController = async (req, res) => {
  try {
    const schoolAdminStaffId = req.params.scsid;

    // Xóa school admin staff dựa trên schoolAdminStaffId
    const schoolAdminStaff = await schoolAdminStaffModel.findById(
      schoolAdminStaffId
    );

    if (!schoolAdminStaff) {
      return res.status(404).send({
        success: false,
        message: "School Admin Staff not found",
      });
    }

    // Xóa thông tin liên quan đến school admin staff
    await accountModel.findByIdAndDelete(schoolAdminStaff.account);

    // Xóa school admin staff
    await schoolAdminStaffModel.findByIdAndDelete(schoolAdminStaffId);

    res.status(200).send({
      success: true,
      message: "School Admin Staff deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting School Admin Staff",
    });
  }
};

export const updateSchoolAdminStaffController = async (req, res) => {
  try {
    const schoolAdminStaffId = req.params.scsid;

    const schoolAdminStaff = await schoolAdminStaffModel.findById(
      schoolAdminStaffId
    );

    const currentEmail = schoolAdminStaff.account.email;
    const currentUsername = schoolAdminStaff.account.username;
    const { name, username, email, password } = req.body;

    //Kiểm tra tính duy nhất của username, email. Kiểm tra cú pháp của email, username, password
    const validation = await validateInputs(
      username,
      email,
      password,
      currentEmail,
      currentUsername,
      schoolAdminStaff.account._id
    );

    if (!validation.success) {
      return res.status(400).send({
        success: false,
        message: validation.message,
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Kiểm tra school admin staff có tồn tại hay không
    if (!schoolAdminStaff) {
      return res.status(404).send({
        success: false,
        message: "School Admin Staff not found",
      });
    }

    // Cập nhật thông tin school admin staff
    await schoolAdminStaffModel.findByIdAndUpdate(schoolAdminStaffId, {
      $set: {
        name,
      },
    });

    //Cập nhật tài khoản school admin staff
    await accountModel.findByIdAndUpdate(schoolAdminStaff.account, {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Lấy thông tin school admin staff đã cập nhật
    const updatedSchoolAdminStaff = await schoolAdminStaffModel
      .findById(schoolAdminStaffId)
      .populate("account");

    res.status(200).send({
      success: true,
      message: "School Admin Staff information updated successfully",
      schoolAdminStaff: updatedSchoolAdminStaff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating School Admin Staff information",
    });
  }
};

export const getSchoolAdminStaffInfoController = async (req, res) => {
  try {
    const schoolAdminStaffId = req.params.scsid;

    // Kiểm tra school admin staff có tồn tại hay không
    const schoolAdminStaff = await schoolAdminStaffModel
      .findById(schoolAdminStaffId)
      .populate("account");
    if (!schoolAdminStaff) {
      return res.status(404).send({
        success: false,
        message: "School Admin Staff not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get School Admin Staff information",
      schoolAdminStaff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving School Admin Staff information",
    });
  }
};
