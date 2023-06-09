import schoolModel from "../models/schoolModel.js";

// Controller để thêm một trường mới
export const createSchool = async (req, res) => {
  try {
    const { name, type, address } = req.body;
    const school = await schoolModel.create({ name, type, address });
    res.status(201).json({ success: true, message: "School created", school });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating school", error });
  }
};

// Controller để cập nhật thông tin một trường
export const updateSchool = async (req, res) => {
  try {
    const { name, type, address } = req.body;
    const updatedSchool = await schoolModel.findByIdAndUpdate(
      req.params.sid,
      { name, type, address },
      { new: true }
    );
    if (!updatedSchool) {
      return res
        .status(404)
        .json({ success: false, message: "School not found" });
    }
    res.json({
      success: true,
      message: "School updated",
      school: updatedSchool,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating school", error });
  }
};

// Controller để xóa một trường
export const deleteSchool = async (req, res) => {
  try {
    const deletedSchool = await schoolModel.findByIdAndRemove(req.params.sid);
    if (!deletedSchool) {
      return res
        .status(404)
        .json({ success: false, message: "School not found" });
    }
    res.json({
      success: true,
      message: "School deleted",
      school: deletedSchool,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting school", error });
  }
};

export const listSchoolsController = async (req, res) => {
  try {
    const schools = await schoolModel.find();
    res.status(200).send({
      success: true,
      message: "List of schools",
      schools,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when listing schools",
      error,
    });
  }
};

export const getSchoolController = async (req, res) => {
  try {
    const school = await schoolModel.findById(req.params.sid);
    if (!school) {
      return res.status(404).send({
        success: false,
        message: "School not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "School details",
      school,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error when getting school",
      error,
    });
  }
};
