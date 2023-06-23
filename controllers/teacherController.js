import mongoose from "mongoose";
import teacherModel from "../models/teacherModel.js";
import accountModel from "../models/accountModel.js";
import personModel from "../models/personModel.js";
import { hashPassword, validateInputs } from "../helpers/authHelpers.js";

export const createTeacherAccountController = async (req, res) => {
  try {
    // Lấy thông tin từ body request
    const {
      name,
      mobileNumber,
      image,
      school,
      address,
      dateOfBirth,
      gender,
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

    // Tạo một tài khoản mới cho giáo viên
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "teacher",
    });

    // Tạo một người (person) mới
    const person = new personModel({
      name,
      mobileNumber,
      dateOfBirth,
      gender,
      image,
      school,
      address,
      account: account._id,
    });

    // Tạo một giáo viên mới
    const teacher = new teacherModel({
      person: person._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, người và giáo viên trong một giao dịch
      await account.save({ session });
      await person.save({ session });
      await teacher.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "Teacher account created successfully",
        teacher,
        person,
        account,
      });
    } catch (error) {
      // Rollback giao dịch nếu có lỗi
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error creating teacher account",
    });
  }
};

export const getAllTeachersController = async (req, res) => {
  try {
    // Lấy tất cả giáo viên từ database
    const teachers = await teacherModel.find().populate("person");

    res.status(200).send({
      success: true,
      message: "Get teachers list",
      teachers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving teachers",
    });
  }
};

export const deleteTeacherController = async (req, res) => {
  try {
    const teacherId = req.params.tid;

    // Xóa giáo viên dựa trên teacherId
    const teacher = await teacherModel.findById(teacherId);
    const person = await personModel.findById(teacher.person);

    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }

    // Xóa thông tin liên quan đến giáo viên
    await personModel.findByIdAndDelete(teacher.person);
    await accountModel.findByIdAndDelete(person.account);

    // Xóa giáo viên
    await teacherModel.findByIdAndDelete(teacherId);

    res.status(200).send({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting teacher",
    });
  }
};

export const updateTeacherController = async (req, res) => {
  try {
    const teacherId = req.params.tid;

    const teacher = await teacherModel.findById(teacherId);
    const person = await personModel.findById(teacher.person);
    const currentEmail = person.account.email;
    const currentUsername = person.account.username;

    const {
      username,
      email,
      password,
      name,
      mobileNumber,
      image,
      dateOfBirth,
      gender,
    } = req.body;

    //Kiểm tra tính duy nhất của username, email. Kiểm tra cú pháp của email, username, password
    const validation = await validateInputs(
      username,
      email,
      password,
      currentEmail,
      currentUsername,
      person.account._id
    );

    if (!validation.success) {
      return res.status(400).send({
        success: false,
        message: validation.message,
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Kiểm tra giáo viên có tồn tại hay không
    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }

    // Cập nhật thông tin người (person)
    await personModel.findByIdAndUpdate(teacher.person, {
      $set: {
        name,
        mobileNumber,
        dateOfBirth,
        gender,
        image,
      },
    });

    //Cập nhật tài khoản giáo viên
    await accountModel.findByIdAndUpdate(person.account, {
      $set: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Lấy thông tin giáo viên đã cập nhật
    const updatedTeacher = await teacherModel
      .findById(teacherId)
      .populate("person");

    res.status(200).send({
      success: true,
      message: "Teacher information updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating teacher information",
    });
  }
};

export const getTeacherInfoController = async (req, res) => {
  try {
    const teacherId = req.params.tid;

    // Kiểm tra giáo viên có tồn tại hay không
    const teacher = await teacherModel.findById(teacherId).populate("person");
    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get teacher information",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving teacher information",
    });
  }
};
