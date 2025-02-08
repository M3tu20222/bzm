import mongoose from "mongoose";

const farmlandOwnershipSchema = new mongoose.Schema({
  farmland: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmland",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sharePercent: { type: Number, required: true },
  validFrom: { type: Date },
  validTo: { type: Date },
});

const FarmlandOwnership =
  mongoose.models.FarmlandOwnership ||
  mongoose.model("FarmlandOwnership", farmlandOwnershipSchema);

export default FarmlandOwnership;
