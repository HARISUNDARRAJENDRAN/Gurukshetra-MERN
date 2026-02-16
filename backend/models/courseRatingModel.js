import mongoose from 'mongoose';

const courseRatingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    courseId: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
  },
  { timestamps: true }
);

courseRatingSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const courseRatingModel =
  mongoose.models.courseRating || mongoose.model('courseRating', courseRatingSchema);

export default courseRatingModel;
