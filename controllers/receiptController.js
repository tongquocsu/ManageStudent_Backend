import Receipt from '../models/receiptModel.js';
import { z } from 'zod';

const receiptValidationSchema = z.object({
  paymentDate: z.date(),
  totalSum: z.number(),
  parentId: z.string().uuid(),
  tuitionFeeId: z.string().uuid(),
});

const createReceipt = async (receiptData) => {
  const validatedData = receiptValidationSchema.parse(receiptData);
  const newReceipt = new Receipt(validatedData);
  const createdReceipt = await newReceipt.save();
  return createdReceipt;
};

// Read a single receipt by ID
const getReceiptById = async (receiptId) => {
  const receipt = await Receipt.findById(receiptId)
    .populate('parents', 'name') 
    .populate('tuitionFee', 'amount');
  return receipt;
};

const updateReceiptById = async (receiptId, updatedData) => {
  const validatedData = receiptValidationSchema.parse(updatedData);
  const updatedReceipt = await Receipt.findByIdAndUpdate(receiptId, validatedData, { new: true });
  return updatedReceipt;
};

const deleteReceiptById = async (receiptId) => {
  const deletedReceipt = await Receipt.findByIdAndDelete(receiptId);
  return deletedReceipt;
};

export { createReceipt, getReceiptById, updateReceiptById, deleteReceiptById };
