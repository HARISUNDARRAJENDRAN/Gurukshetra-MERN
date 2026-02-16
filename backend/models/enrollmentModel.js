import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

enrollmentSchema.index({ courseId: 1, userId: 1 }, { unique: true });

const enrollmentModel =
  mongoose.models.enrollment || mongoose.model('enrollment', enrollmentSchema);

export default enrollmentModel;
