import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    courseId: { type: String, required: true, index: true },
    completedLectures: { type: [String], default: [] },
  },
  { timestamps: true }
);

courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const courseProgressModel =
  mongoose.models.courseProgress || mongoose.model('courseProgress', courseProgressSchema);

export default courseProgressModel;
