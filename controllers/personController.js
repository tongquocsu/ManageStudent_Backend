import personModel from "../models/personModel.js";

export const getAllPersonsController = async (req, res) => {
  try {
    const persons = await personModel.find().populate("account");
    res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error listing persons", error });
  }
};
