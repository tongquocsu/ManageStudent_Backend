import Schedule from '../models/scheduleModel.js';
import { z } from 'zod';

//Schedule
const createScheduleSchema = z.object({
    semester: z.string().nonempty(),
    classPeriod: z.string().nonempty(),
    classroomId: z.string().nonempty(),
    subjectId: z.string().nonempty(),
    teacherId: z.string().nonempty(),
    academicYearId: z.string().nonempty(),
});
export const createScheduleStudent = async(req,res) => {
    try {
        const scheduleData = createScheduleSchema.parse(req.body);
        const schedule = new Schedule(scheduleData);
        const savedSchedule = await schedule.save();
    
        res.status(201).json({ message: 'Schedule created successfully', schedule: savedSchedule });
      } catch (error) {
        res.status(400).json({ message: 'Invalid schedule data', error: error.message });
      }
}
export const getScheduleStudent = async(req,res) => {
    try {
        const schedules = await Schedule.find().exec();
        res.json({ schedules });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
    }
}
export const getScheduleStudentDetail = async(req,res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
        .populate('classroom subject teacher academicYear', 'name type person year')
        .exec();
    if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
    } else {
        res.json({ message: 'Find schedule successfully', schedule: schedule });
      }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
    }
}
export const updateScheduleStudent = async (req, res) => {
    const { id } = req.params;
    const scheduleData = createScheduleSchema.parse(req.body);
  
    try {
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, scheduleData, { new: true }).exec();
      if (!updatedSchedule) {
        res.status(404).json({ message: 'Schedule not found' });
      } else {
        res.json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update schedule', error: error.message });
    }
};
export const deleteScheduleStudent =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedSchedule = await Schedule.findByIdAndRemove(id).exec();
      if (!deletedSchedule) {
        res.status(404).json({ message: 'Schedule not found' });
      } else {
        res.json({ message: 'Schedule deleted successfully', schedule: deletedSchedule });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
    }
}