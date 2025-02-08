import mongoose from "mongoose";

const paymentDetailSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const farmlandExpenseDistributionSchema = new mongoose.Schema({
  expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FarmlandExpense",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  allocatedCost: { type: Number, required: true },
  paidCost: { type: Number, default: 0 },
  creditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "partialPaid", "paid"],
    default: "pending",
  },
  paymentDetails: [paymentDetailSchema],
});

const FarmlandExpenseDistribution =
  mongoose.models.FarmlandExpenseDistribution ||
  mongoose.model(
    "FarmlandExpenseDistribution",
    farmlandExpenseDistributionSchema
  );

export default FarmlandExpenseDistribution;
