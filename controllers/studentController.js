import accountModel from "../models/accountModel.js";
import studentModel from "../models/studentModel.js";

export const getInfoStudent = async (req, res) => {
  try {
    const student = await studentModel
      .findOne({ account: req.account._id })
      .populate("account", "username email");

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

export const updateProfileStudent = async (req, res) => {

  const { name, studentID, mobileNumber, dateOfBirth, gender, school, address, klass, image } = req.body;

  const student = await studentModel.findOne({ account: req.account._id });

  try {

    if (!student) {
      // Nếu không tìm thấy thông tin sinh viên trong cơ sở dữ liệu, tạo mới một bản ghi
      const newStudent = await studentModel.create({
        account: req.account._id,
        studentID,
        name,
        mobileNumber,
        dateOfBirth,
        gender,
        school,
        address,
        klass,
        image
      });
      return res.status(200).send({
        success: true,
        message: "Tạo mới thông tin sinh viên thành công",
        data: newStudent,
      });
    }

    const updatedStudent = await studentModel.findByIdAndUpdate(student._id, {
      $set: req.body,
    });
    if (updatedStudent) {
      const updatedAccount = await accountModel
        .findByIdAndUpdate(
          req.account._id,
          { $set: req.body },
          { new: true, runValidators: true }
        )
        .select("-password -role");
      return res.status(200).send({
        success: true,
        message: "Update Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updateProfileStudent func",
      error,
    });
  }
};

