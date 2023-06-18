import ClassRoom from '../models/classroomModel.js';
import { z } from 'zod';
//ClassRoom
const createClassroomSchema = z.object({
    name: z.string().nonempty(),
    type: z.string().nonempty(),
});
export const createClassroom = async (req, res) => {
    try {
      const classroomData = createClassroomSchema.parse(req.body);
  
      const newClassroom = new ClassRoom(classroomData);
      const savedClassroom = await newClassroom.save();
  
      res.status(201).json({ message: "Classroom created successfully", classroom: savedClassroom });
    } catch (error) {
      res.status(400).json({ message: "Invalid classroom data", error: error.message });
    }
};
export const getAllClassrooms = async (req, res) => {
    try {
      const classrooms = await ClassRoom.find();
      res.status(200).json({ classrooms });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classrooms", error: error.message });
    }
};
export const getClassroomById = async (req, res) => {
    const { id } = req.params;
    try {
      const classroomObj = await ClassRoom.findById(id);
      if (!classroomObj) {
        res.status(404).json({ message: "Classroom not found" });
      } else {
        res.status(200).json({ classroom: classroomObj });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classroom", error: error.message });
    }
};
export const updateClassroom = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedClassroom = await ClassRoom.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedClassroom) {
        res.status(404).json({ message: "Classroom not found" });
      } else {
        res.status(200).json({ message: "Classroom updated successfully", classroom: updatedClassroom });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update classroom", error: error.message });
    }
};
export const deleteClassroom = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedClassroom = await ClassRoom.findByIdAndRemove(id);
      if (!deletedClassroom) {
        res.status(404).json({ message: "Classroom not found" });
      } else {
        res.status(200).json({ message: "Classroom deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete classroom", error: error.message });
    }
};