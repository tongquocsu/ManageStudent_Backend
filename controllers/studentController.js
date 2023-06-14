import studentModel from "../models/studentModel.js";
import accountModel from "../models/accountModel.js";
import personModel from "../models/personModel.js";
import { hashPassword } from "../helpers/authHelpers.js";

export const createStudentAccountController = async (req, res) => {
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

    // Kiểm tra email đã tồn tại hay chưa
    const existUser = await accountModel.findOne({ email });

    if (existUser) {
      return res.status(200).send({
        success: true,
        message: "Email has been taken",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Tạo một tài khoản mới cho sinh viên
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "student",
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
    const student = new studentModel({
      person: person._id,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      klass: req.body.klass,
      role: "student",
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

export const getAllStudentsController = async (req, res) => {
  try {
    // Lấy tất cả học sinh từ database
    const students = await studentModel.find().populate("person");

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

export const deleteStudentController = async (req, res) => {
  try {
    const studentId = req.params.sid;

    // Xóa học sinh dựa trên studentId
    const student = await studentModel.findById(studentId);
    const person = await personModel.findById(student.person);

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    // Xóa thông tin liên quan đến học sinh
    await personModel.findByIdAndDelete(student.person);
    await accountModel.findByIdAndDelete(person.account);

    // Xóa học sinh
    await studentModel.findByIdAndDelete(studentId);

    res.status(200).send({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting student",
    });
  }
};

export const updateStudentController = async (req, res) => {
  try {
    const studentId = req.params.sid;
    const {
      name,
      mobileNumber,
      image,
      school,
      address,
      dateOfBirth,
      gender,
      klass,
    } = req.body;

    // Kiểm tra học sinh có tồn tại hay không
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    // Cập nhật thông tin học sinh
    await studentModel.findByIdAndUpdate(studentId, {
      $set: {
        dateOfBirth,
        gender,
        klass,
      },
    });

    // Cập nhật thông tin người (person)
    await personModel.findByIdAndUpdate(student.person, {
      $set: {
        name,
        mobileNumber,
        image,
        school,
        address,
      },
    });

    // Lấy thông tin học sinh đã cập nhật
    const updatedStudent = await studentModel
      .findById(studentId)
      .populate("person");

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

export const getStudentInfoController = async (req, res) => {
  try {
    const studentId = req.params.sid;

    // Kiểm tra học sinh có tồn tại hay không
    const student = await studentModel.findById(studentId).populate("person");
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get student information",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving student information",
    });
  }
};
