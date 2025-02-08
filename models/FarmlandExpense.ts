import mongoose from "mongoose";

export interface IFarmlandExpense extends mongoose.Document {
  farmland: mongoose.Types.ObjectId;
  type: string;
  totalCost: number;
  season: mongoose.Types.ObjectId;
  expenseDate: Date;
}

const farmlandExpenseSchema = new mongoose.Schema<IFarmlandExpense>({
  farmland: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmland",
    required: true,
  },
  type: { type: String, required: true },
  totalCost: { type: Number, required: true },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  expenseDate: { type: Date, required: true },
});

const FarmlandExpense =
  mongoose.models.FarmlandExpense ||
  mongoose.model<IFarmlandExpense>("FarmlandExpense", farmlandExpenseSchema);

export default FarmlandExpense;
