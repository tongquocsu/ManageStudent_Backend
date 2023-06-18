import TuitionFee from '../models/tuitionFeeModel.js';
import { z } from 'zod';
const createTuitionFeeSchema = z.object({
    semesterTuitionFee: z.number().positive(),
    miscellaneousFees: z.number().positive(),
    status: z.boolean(),
    parentId: z.string().nonempty(),
    accountantId: z.string().nonempty(),
});
export const createTuitionFee = async (req, res) => {
    try {
      const tuitionFeeData = createTuitionFeeSchema.parse(req.body);
  
      const newTuitionFee = new TuitionFee(tuitionFeeData);
      const savedTuitionFee = await newTuitionFee.save();
  
      res.status(201).json({ message: "Tuition fee created successfully", tuitionFee: savedTuitionFee });
    } catch (error) {
      res.status(400).json({ message: "Invalid tuition fee data", error: error.message });
    }
};
export const getAllTuitionFees = async (req, res) => {
    try {
      const tuitionFees = await TuitionFee.find();
      res.status(200).json({ tuitionFees });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tuition fees", error: error.message });
    }
};
export const getTuitionFeeById = async (req, res) => {
    const { id } = req.params;
    try {
      const tuitionFeeObj = await TuitionFee.findById(id);
      if (!tuitionFeeObj) {
        res.status(404).json({ message: "Tuition fee not found" });
      } else {
        res.status(200).json({ tuitionFee: tuitionFeeObj });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tuition fee", error: error.message });
    }
};
export const updateTuitionFee = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedTuitionFee = await TuitionFee.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTuitionFee) {
        res.status(404).json({ message: "Tuition fee not found" });
      } else {
        res.status(200).json({ message: "Tuition fee updated successfully", tuitionFee: updatedTuitionFee });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update tuition fee", error: error.message });
    }
};
export const deleteTuitionFee = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTuitionFee = await TuitionFee.findByIdAndRemove(id);
      if (!deletedTuitionFee) {
        res.status(404).json({ message: "Tuition fee not found" });
      } else {
        res.status(200).json({ message: "Tuition fee deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tuition fee", error: error.message });
    }
};