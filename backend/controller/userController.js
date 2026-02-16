import userModel from '../models/userModel.js';
import courseProgressModel from '../models/courseProgressModel.js';
import courseRatingModel from '../models/courseRatingModel.js';
import courseModel from '../models/courseModel.js';

export const becomeEducator = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.role === 'educator') {
            return res.json({ success: true, message: 'You are already an educator' });
        }

        user.role = 'educator';
        await user.save();

        return res.json({
            success: true,
            message: 'You are now an educator',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                publicMetadata: { role: user.role },
                isAccountVerified: user.isAccountVerified,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const fetchEducatorCourses = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'educator') {
            return res.json({ success: false, message: 'Only educators can access educator courses' });
        }

        const courses = await courseModel
            .find({ educator: req.userId })
            .sort({ createdAt: -1 })
            .lean();

        const normalizedCourses = courses.map((course) => ({
            ...course,
            courseRatings: [],
        }));

        return res.json({
            success: true,
            courses: normalizedCourses,
            message: 'Educator courses fetched successfully',
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const fetchEducatorDashboardData = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'educator') {
            return res.json({ success: false, message: 'Only educators can access dashboard data' });
        }

        const courses = await courseModel
            .find({ educator: req.userId })
            .populate('enrolledStudents', 'name email')
            .lean();

        const totalCourses = courses.length;
        const totalEnrollments = courses.reduce(
            (sum, course) => sum + (course.enrolledStudents?.length || 0),
            0
        );

        const totalEarnings = courses.reduce((sum, course) => {
            const finalPrice = course.coursePrice - (course.coursePrice * course.discount) / 100;
            return sum + finalPrice * (course.enrolledStudents?.length || 0);
        }, 0);

        const enrolledStudentsData = courses.flatMap((course) =>
            (course.enrolledStudents || []).map((student) => ({
                courseTitle: course.courseTitle,
                student: {
                    _id: student._id,
                    name: student.name,
                    email: student.email,
                },
            }))
        );

        return res.json({
            success: true,
            dashboardData: {
                totalEnrollments,
                totalCourses,
                totalEarnings: Number(totalEarnings.toFixed(2)),
                enrolledStudentsData,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const fetchUserCourseProgress = async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.json({ success: false, message: 'Course ID is required' });
    }

    try {
        const progress = await courseProgressModel.findOne({
            userId: req.userId,
            courseId,
        });

        const completedLectures = progress?.completedLectures || [];

        return res.json({
            success: true,
            progressData: {
                courseId,
                completedLectures,
                lectureCompleted: completedLectures.length,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const updateCourseProgress = async (req, res) => {
    const { courseId, lectureId } = req.body;

    if (!courseId || !lectureId) {
        return res.json({ success: false, message: 'Course ID and lecture ID are required' });
    }

    try {
        const progress = await courseProgressModel.findOneAndUpdate(
            { userId: req.userId, courseId },
            { $addToSet: { completedLectures: lectureId } },
            { new: true, upsert: true }
        );

        return res.json({
            success: true,
            message: 'Lecture marked as completed',
            progressData: {
                courseId,
                completedLectures: progress.completedLectures,
                lectureCompleted: progress.completedLectures.length,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const fetchUserCourseRating = async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.json({ success: false, message: 'Course ID is required' });
    }

    try {
        const [userRatingDoc, aggregate] = await Promise.all([
            courseRatingModel.findOne({ userId: req.userId, courseId }),
            courseRatingModel.aggregate([
                { $match: { courseId } },
                {
                    $group: {
                        _id: '$courseId',
                        averageRating: { $avg: '$rating' },
                        totalRatings: { $sum: 1 },
                    },
                },
            ]),
        ]);

        const averageRating = aggregate[0]?.averageRating || 0;
        const totalRatings = aggregate[0]?.totalRatings || 0;

        return res.json({
            success: true,
            ratingData: {
                courseId,
                userRating: userRatingDoc?.rating || 0,
                averageRating,
                totalRatings,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const updateCourseRating = async (req, res) => {
    const { courseId, rating } = req.body;

    if (!courseId || rating === undefined || rating === null) {
        return res.json({ success: false, message: 'Course ID and rating are required' });
    }

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
        return res.json({ success: false, message: 'Rating must be between 0 and 5' });
    }

    try {
        await courseRatingModel.findOneAndUpdate(
            { userId: req.userId, courseId },
            { rating: numericRating },
            { upsert: true, new: true }
        );

        const aggregate = await courseRatingModel.aggregate([
            { $match: { courseId } },
            {
                $group: {
                    _id: '$courseId',
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 },
                },
            },
        ]);

        return res.json({
            success: true,
            message: 'Rating submitted successfully',
            ratingData: {
                courseId,
                userRating: numericRating,
                averageRating: aggregate[0]?.averageRating || numericRating,
                totalRatings: aggregate[0]?.totalRatings || 1,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
