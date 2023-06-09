import classModel from "../models/classModel.js";

export const addClassController = async (req, res) => {
  try {
    const { name, gradeLevel, classYear, classEnrollment, school } = req.body;

    const newClass = new classModel({
      name,
      gradeLevel,
      classYear,
      classEnrollment,
      school,
    });

    const savedClass = await newClass.save();
    res
      .status(201)
      .json({ success: true, message: "Class created", class: savedClass });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating class", error });
  }
};

export const getClassController = async (req, res) => {
  try {
    const classId = req.params.cid;
    const foundClass = await classModel.findById(classId);
    res.status(200).json(foundClass);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving class", error });
  }
};

export const updateClassController = async (req, res) => {
  try {
    const { name, gradeLevel, classYear, classEnrollment, school } = req.body;

    const updatedClass = await classModel.findByIdAndUpdate(
      req.params.cid,
      { name, gradeLevel, classYear, classEnrollment, school },
      { new: true }
    );
    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.json({ success: true, message: "Class updated", class: updatedClass });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating class", error });
  }
};

export const deleteClassController = async (req, res) => {
  try {
    const deleteClassTarget = await classModel.findByIdAndRemove(
      req.params.cid
    );
    if (!deleteClassTarget) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.status(200).json({
      success: true,
      message: "Class deleted",
      class: deleteClassTarget,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting class", error });
  }
};

export const listClassesController = async (req, res) => {
  try {
    const classes = await classModel.find();
    res.status(200).send({
      success: true,
      message: "List of classes",
      classes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when listing classes",
      error,
    });
  }
};
