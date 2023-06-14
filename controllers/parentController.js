import parentsModel from "../models/parentsModel.js";
import personModel from "../models/personModel.js";
import accountModel from "../models/accountModel.js";
import { hashPassword } from "../helpers/authHelpers.js";

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

    //check email exist
    const existUser = await accountModel.findOne({ email });
    //exist user
    if (existUser) {
      return res.status(200).send({
        success: true,
        message: "Email has been taken",
      });
    }

    //Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // Tạo một tài khoản mới cho sinh viên
    const account = new accountModel({
      username,
      email,
      password: hashedPassword,
      role: "parent",
    });

    // Lưu tài khoản
    await account.save();

    // Tạo một người (person) mới
    const person = new personModel({
      name,
      mobileNumber,
      image,
      school,
      address,
      account: account._id,
    });

    // Lưu người (person)
    await person.save();

    // Tạo một phụ huynh mới
    const parent = new parentsModel({
      person: person._id,
    });

    // Lưu phụ huynh
    await parent.save();

    res.status(201).send({
      success: true,
      message: "Parent account created successfully",
      parent,
      person,
      account,
    });
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

    // Xóa phụ huynh dựa trên parentId
    const parent = await parentsModel.findById(parentId);
    const person = await personModel.findById(parent.person);

    if (!parent) {
      return res.status(404).send({
        success: false,
        message: "Parent not found",
      });
    }

    // Xóa thông tin liên quan đến phụ huynh
    await personModel.findByIdAndDelete(parent.person);

    // Xóa phụ huynh
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
    const { name, mobileNumber, image, address, tuitionFee } = req.body;

    // Kiểm tra phụ huynh có tồn tại hay không
    const parent = await parentsModel.findById(parentId);
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
