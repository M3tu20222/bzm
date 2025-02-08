import mongoose from "mongoose";

export interface ISeason extends mongoose.Document {
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  year: number;
}

const seasonSchema = new mongoose.Schema<ISeason>({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  active: { type: Boolean, default: true },
  year: { type: Number, required: true, unique: true },
});

seasonSchema.pre("validate", function (next) {
  if (this.year) {
    // Set name
    this.name = `${this.year}-${this.year + 1} Sezonu`;

    // Set start date to April 16th of the given year
    this.startDate = new Date(this.year, 3, 16); // Month is 0-based, so 3 is April

    // Set end date to April 15th of the next year
    this.endDate = new Date(this.year + 1, 3, 15); // Month is 0-based, so 3 is April
  }
  next();
});

const Season =
  mongoose.models.Season || mongoose.model<ISeason>("Season", seasonSchema);

export default Season;
