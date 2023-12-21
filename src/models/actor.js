import mongoose, { Schema, models } from "mongoose";

const actorsSchema = new Schema(
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

const Actor = models.Actor || mongoose.model("Actor", actorsSchema);
export default Actor;
