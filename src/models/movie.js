import mongoose, { Schema, models } from "mongoose";

const moviesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    yearOfRelease: {
      type: Number,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
    },
    actors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Actor",
      },
    ],
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
      required: true,
    },
  },
  { timestamps: true }
);

moviesSchema.virtual("populatedActors", {
  ref: "Actor",
  localField: "actors",
  foreignField: "_id",
  justOne: false,
});

moviesSchema.virtual("populatedProducer", {
  ref: "Producer",
  localField: "producer",
  foreignField: "_id",
  justOne: true,
});

moviesSchema.set("toObject", { virtuals: true });
moviesSchema.set("toJSON", { virtuals: true });
const Movie = models.Movie || mongoose.model("Movie", moviesSchema);
export default Movie;
