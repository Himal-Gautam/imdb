import mongoose, { Schema, models } from "mongoose";

const producersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Producer = models.Producer || mongoose.model("Producer", producersSchema);
export default Producer;
