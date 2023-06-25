import mongoose from "mongoose";
import { hashPassword } from "../helpers/authHelpers.js";
import accountModel from "../models/accountModel.js";
import personModel from "../models/personModel.js";
import teacherModel from "../models/teacherModel.js";

export const createTeacherAccount = async (req, res) => {
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
      role: "teacher",
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

    const teacher = new teacherModel({
      person: person._id,
    });

    // Mở một session để bắt đầu giao dịch trong MongoDB
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Lưu tài khoản, người và học sinh trong một giao dịch
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
      message: "Error creating student account",
    });
  }
};

export const updateProfileTeacher = async (req, res) => {
  try {
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
    } = req.body;

    const teacher = await teacherModel.findById(req.params.tid);

    if (!teacher) {
      return res.status(404).send({
        success: false,
        message: "Teacher not found",
      });
    }

    // Cập nhật thông tin học sinh
    await teacherModel.findByIdAndUpdate(req.params.tid, {
      $set: {},
    });

    const person = await personModel.findById(teacher.person);

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

    const updatedTeacher = await teacherModel
      .findById(req.params.sid)
      .populate({
        path: "person",
        populate: { path: "account", select: "username email" },
      });

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
      message: "Error updating student information",
    });
  }
};

export const getInfoTeacher = async (req, res) => {
  try {
    const accountId = req.account._id;

    const person = await personModel.findOne({ account: accountId });

    const teacher = await teacherModel
      .findOne({ person: person._id })
      .populate({
        path: "person",
        select: "name mobileNumber school address account dateOfBirth gender",
        populate: {
          path: "account",
          select: "username email",
        },
      })
      .select("klass person");

    if (!teacher) {
      return res.status(400).send({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "OK",
      teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getInfoTeacher func",
      error,
    });
  }
};
