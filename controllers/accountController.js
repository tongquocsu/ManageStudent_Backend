import mongoose from "mongoose";
import accountModel from "../models/accountModel.js";

export const getAllAccountController = async (req, res) => {
  try {
    // Lấy tất cả accountants từ database
    const accounts = await accountModel.find();

    res.status(200).send({
      success: true,
      message: "Get accounts list",
      accounts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving accounts",
    });
  }
};
