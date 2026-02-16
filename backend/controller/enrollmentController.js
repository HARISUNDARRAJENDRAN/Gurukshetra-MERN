import enrollmentModel from '../models/enrollmentModel.js';

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    const enrollment = await enrollmentModel.findOneAndUpdate(
      { courseId, userId: req.userId },
      { courseId, userId: req.userId },
      { upsert: true, new: true }
    );

    return res.status(201).json({ success: true, message: 'Enrollment successful', enrollment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentModel.find({ userId: req.userId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, enrollments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
