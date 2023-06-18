import Class from '../models/classModel.js';
import { z } from 'zod';
const createClassSchema = z.object({
    name: z.string().nonempty(),
    gradeLevel: z.string().nonempty(),
    classYear: z.date(),
    classEnrollment: z.string().nonempty(),
    school: z.string().nonempty(),
});
export const createClass = async (req, res) => {
    try {
      const classData = createClassSchema.parse(req.body);
  
      const newClass = new Class(classData);
      const savedClass = await newClass.save();
  
      res.status(201).json({ message: "Class created successfully", class: savedClass });
    } catch (error) {
      res.status(400).json({ message: "Invalid class data", error: error.message });
    }
};
export const getAllClasses = async (req, res) => {
    try {
      const classes = await Class.find();
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes", error: error.message });
    }
};
export const getClassDetail = async (req, res) => {
    const { id } = req.params;
    try {
      const classObj = await Class.findById(id);
      if (!classObj) {
        res.status(404).json({ message: "Class not found" });
      } else {
        res.status(200).json({ class: classObj });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class", error: error.message });
    }
};
export const updateClass = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedClass = await Class.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedClass) {
        res.status(404).json({ message: "Class not found" });
      } else {
        res.status(200).json({ message: "Class updated successfully", class: updatedClass });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update class", error: error.message });
    }
};
export const deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedClass = await Class.findByIdAndRemove(id);
      if (!deletedClass) {
        res.status(404).json({ message: "Class not found" });
      } else {
        res.status(200).json({ message: "Class deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class", error: error.message });
    }
};