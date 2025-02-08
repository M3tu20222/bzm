import mongoose from "mongoose";

export interface IFarmland extends mongoose.Document {
  name: string;
  size: number; // dekar cinsinden
  owners: Array<{ user: mongoose.Types.ObjectId; sharePercent: number }>;
  product: string;
  status: string;
  irrigated: boolean;
  rented: boolean;
  plotInfo: string; // ada-parsel bilgisi
  currentSeason: mongoose.Types.ObjectId;
}

const farmlandSchema = new mongoose.Schema<IFarmland>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  owners: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      sharePercent: Number,
    },
  ],
  product: { type: String, required: true },
  status: { type: String, required: true },
  irrigated: { type: Boolean, default: false },
  rented: { type: Boolean, default: false },
  plotInfo: { type: String, required: true },
  currentSeason: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
});

const Farmland =
  mongoose.models.Farmland ||
  mongoose.model<IFarmland>("Farmland", farmlandSchema);

export default Farmland;
