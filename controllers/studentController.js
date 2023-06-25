import mongoose from "mongoose";
import { hashPassword } from "../helpers/authHelpers.js";
import accountModel from "../models/accountModel.js";
import personModel from "../models/personModel.js";
import studentModel from "../models/studentModel.js";

export const createStudentAccount = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      image,
      school,
      address,
      username,
      email,
      password,
      dateOfBirth,
      gender,
      klass,
    } = req.body;

    const existUser = await accountModel.findOne({ email, username });

    if (existUser) {
      return res.status(200).send({
        success: true,
        message: "Email or username has been taken",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "student",
    });

    const person = new personModel({
      name,
      mobileNumber,
      image,
      school,
      address,
      account: account._id,
      dateOfBirth,
      gender,
    });

    const student = new studentModel({
      person: person._id,
      klass,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, người và học sinh trong một giao dịch
      await account.save({ session });
      await person.save({ session });
      await student.save({ session });

      // Commit giao dịch nếu không có lỗi
      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        success: true,
        message: "Student account created successfully",
        student,
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
      message: "Error creating student account",
    });
  }
};

export const updateProfileStudent = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      image,
      school,
      address,
      dateOfBirth,
      gender,
      klass,
      username,
      email,
    } = req.body;

    // Kiểm tra học sinh có tồn tại hay không
    const student = await studentModel.findById(req.params.sid);

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    // Cập nhật thông tin học sinh
    await studentModel.findByIdAndUpdate(req.params.sid, {
      $set: {
        klass,
      },
    });

    const person = await personModel.findById(student.person);

    await personModel.findByIdAndUpdate(person, {
      $set: {
        name,
        mobileNumber,
        image,
        school,
        address,
        dateOfBirth,
        gender,
      },
    });

    const account = await accountModel.findById(person.account);

    await accountModel.findByIdAndUpdate(account, {
      $set: {
        username,
        email,
      },
    });

    const updatedStudent = await studentModel
      .findById(req.params.sid)
      .populate({
        path: "person",
        populate: { path: "account", select: "username email" },
      });

    res.status(200).send({
      success: true,
      message: "Student information updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating student information",
    });
  }
};

export const getInfoStudent = async (req, res) => {
  try {
    const accountId = req.account._id;

    const person = await personModel.findOne({ account: accountId });

    const student = await studentModel
      .findOne({ person: person._id })
      .populate({
        path: "person",
        select: "name mobileNumber school address account dateOfBirth gender",
        populate: {
          path: "account",
          select: "username email",
        },
      })
      .populate("klass", "name gradeLevel classEnrollment")
      .select("klass person");

    if (!student) {
      return res.status(400).send({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "OK",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getInfoStudent func",
      error,
    });
  }
};

export const getAllStudentsController = async (req, res) => {
  try {
    const students = await studentModel
      .find()
      .populate({
        path: "person",
        select: "name mobileNumber address account gender",
        populate: {
          path: "account",
          select: "username email",
        },
      })
      .populate("klass", "name gradeLevel classEnrollment")
      .select("klass person");

    res.status(200).send({
      success: true,
      message: "Get students list",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving students",
    });
  }
};

export const getAllStudentsByClass = async (req, res) => {
  const classId = req.params.cid;
  try {
    const students = await studentModel
      .find({ klass: classId })
      .populate({
        path: "person",
        select: "name mobileNumber address gender",
      })
      .select("person");

    res.status(200).send({
      success: true,
      message: "Get students list",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving students",
    });
  }
};
