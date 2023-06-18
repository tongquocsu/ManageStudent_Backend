import { z } from "zod";
import StudentRecords from "../models/studentRecordsModel.js";

const studentRecordsValidationSchema = z.object({
  information: z.string().nonempty(),
  image: z.string().nonempty(),
  parentId: z.string().nonempty(),
  feeId: z.string().nonempty(),
  processStudying: z.string().nonempty(),
});

export const createStudentRecord = async (req, res) => {
  try {
    const { information, image, parentId, feeId, processStudying } =
      studentRecordsValidationSchema.parse(req.body);

    const studentRecord = await StudentRecords.create({
      information,
      image,
      parentId: parentId,
      feeId: feeId,
      processStudying
    });

    res.status(201).json({ studentRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllStudentRecords = async (req, res) => {
  try {
    const studentRecords = await StudentRecords.find().populate([
      "parent",
      "fee",
      "schedule",
    ]);

    res.status(200).json({ studentRecords });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudentRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const studentRecord = await StudentRecords.findById(id).populate([
      "parent",
      "fee",
      "schedule",
    ]);

    if (!studentRecord) {
      throw new Error("Student record not found");
    }

    res.status(200).json({ studentRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStudentRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { information, image, parentId, feeId, processStudying } =
      studentRecordsValidationSchema.parse(req.body);

    const studentRecord = await StudentRecords.findByIdAndUpdate(
      id,
      {
        information,
        image,
        parentId: parentId,
        feeId: feeId,
        processStudying
      },
      { new: true }
    ).populate(["parent", "fee", "schedule"]);

    if (!studentRecord) {
      throw new Error("Student record not found");
    }

    res.status(200).json({ studentRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStudentRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const studentRecord = await StudentRecords.findByIdAndDelete(id);

    if (!studentRecord) {
      throw new Error("Student record not found");
    }

    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

