import mongoose from "mongoose";
import parentsModel from "../models/parentsModel.js";
import personModel from "../models/personModel.js";
import accountModel from "../models/accountModel.js";
import { hashPassword, validateInputs } from "../helpers/authHelpers.js";

export const createParentController = async (req, res) => {
  try {
    // Lấy thông tin từ body request
    const {
      name,
      mobileNumber,
      image,
      school,
      address,
      username,
      email,
      password,
    } = req.body;

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

    // Tạo một tài khoản mới cho sinh viên
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "parent",
    });

    // Tạo một người (person) mới
    const person = new personModel({
      name,
      mobileNumber,
      image,
      school,
      address,
      account: account._id,
    });

    // Tạo một học sinh mới
    const parent = new parentsModel({
      person: person._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, người và học sinh trong một giao dịch
      await account.save({ session });
      await person.save({ session });
      await parent.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "Parent account created successfully",
        parent,
        person,
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
      message: "Error creating parent account",
    });
  }
};

export const getAllParentsController = async (req, res) => {
  try {
    // Lấy tất cả phụ huynh từ database
    const parents = await parentsModel.find().populate("person");

    res.status(200).send({
      success: true,
      message: "Get parents list",
      parents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving parents",
    });
  }
};

export const deleteParentController = async (req, res) => {
  try {
    const parentId = req.params.pid;

    // Xóa học sinh dựa trên studentId
    const parent = await parentsModel.findById(parentId);
    const person = await personModel.findById(parent.person);

    if (!parent) {
      return res.status(404).send({
        success: false,
        message: "Parent not found",
      });
    }

    // Xóa thông tin liên quan đến học sinh
    await personModel.findByIdAndDelete(parent.person);
    await accountModel.findByIdAndDelete(person.account);

    // Xóa học sinh
    await parentsModel.findByIdAndDelete(parentId);

    res.status(200).send({
      success: true,
      message: "Parent deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting parent",
    });
  }
};

export const updateParentController = async (req, res) => {
  try {
    const parentId = req.params.pid;

    const parent = await parentsModel.findById(parentId);
    const person = await personModel.findById(parent.person);

    const {
      username,
      email,
      password,
      name,
      mobileNumber,
      image,
      address,
      tuitionFee,
    } = req.body;

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

    // Kiểm tra phụ huynh có tồn tại hay không
    if (!parent) {
      return res.status(404).send({
        success: false,
        message: "Parent not found",
      });
    }

    // Cập nhật thông tin phụ huynh
    await parentsModel.findByIdAndUpdate(parentId, {
      $set: {
        tuitionFee,
      },
    });

    // Cập nhật thông tin người (person)
    await personModel.findByIdAndUpdate(parent.person, {
      $set: {
        name,
        mobileNumber,
        image,
        address,
      },
    });

    //Cập nhật tài khoản phụ huynh
    await accountModel.findByIdAndUpdate(person.account, {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Lấy thông tin phụ huynh đã cập nhật
    const updatedParent = await parentsModel
      .findById(parentId)
      .populate("person");

    res.status(200).send({
      success: true,
      message: "Parent information updated successfully",
      parent: updatedParent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating parent information",
    });
  }
};

export const getParentInfoController = async (req, res) => {
  try {
    const parentId = req.params.pid;

    // Kiểm tra phụ huynh có tồn tại hay không
    const parent = await parentsModel.findById(parentId).populate("person");
    if (!parent) {
      return res.status(404).send({
        success: false,
        message: "Parent not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get parent information",
      parent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving parent information",
    });
  }
};
