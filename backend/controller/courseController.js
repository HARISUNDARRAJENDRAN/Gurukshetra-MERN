import courseModel from '../models/courseModel.js';
import userModel from '../models/userModel.js';
import { getCloudinary } from '../config/cloudinary.js';

const parseArray = (value, fallback = []) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }
  return fallback;
};

const uploadThumbnailToCloudinary = async (thumbnail) => {
  const cloudinary = getCloudinary();

  if (!thumbnail) {
    return {
      secureUrl: 'https://placehold.co/600x340?text=Course',
      publicId: '',
    };
  }

  if (!cloudinary) {
    return {
      secureUrl: thumbnail,
      publicId: '',
    };
  }

  const uploaded = await cloudinary.uploader.upload(thumbnail, {
    folder: 'gurukshetra/courses',
    resource_type: 'image',
  });

  return {
    secureUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
  };
};

const ensureEducator = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    return { error: { status: 404, message: 'User not found' } };
  }

  if (user.role !== 'educator') {
    return { error: { status: 403, message: 'Only educators can perform this action' } };
  }

  return { user };
};

export const createCourse = async (req, res) => {
  try {
    const { user, error } = await ensureEducator(req.userId);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    const {
      courseTitle,
      courseDescription,
      price,
      coursePrice,
      discount = 0,
      thumbnail,
      courseThumbnail = '',
      categories,
      chapters,
      isPublished = false,
      category = 'General',
      level = 'Beginner',
      language = 'English',
      durationHours = 1,
      totalLectures = 1,
    } = req.body;

    const finalPriceInput = price ?? coursePrice;
    const finalThumbnailInput = thumbnail || courseThumbnail;
    const finalCategories = parseArray(categories, category ? [category] : []);
    const finalChapters = parseArray(chapters, []);

    if (!courseTitle || !courseDescription || finalPriceInput === undefined || discount === undefined || !finalThumbnailInput || !finalCategories.length) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: courseTitle, courseDescription, price, discount, thumbnail, categories',
      });
    }

    const normalizedPrice = Number(finalPriceInput);
    if (Number.isNaN(normalizedPrice) || normalizedPrice < 0) {
      return res.status(400).json({ success: false, message: 'Course price must be a valid positive number' });
    }

    const lectureCount = Math.max(1, Number(totalLectures) || 1);
    const totalDurationMinutes = Math.max(1, Math.round((Number(durationHours) || 1) * 60));
    const perLectureMinutes = Math.max(1, Math.round(totalDurationMinutes / lectureCount));

    const chapterContent = Array.from({ length: lectureCount }, (_, index) => ({
      lectureId: `lecture-${index + 1}`,
      lectureTitle: `Lecture ${index + 1}`,
      lectureDuration: perLectureMinutes,
      lectureUrl: '',
      isPreviewFree: index === 0,
      lectureOrder: index + 1,
    }));

    const { secureUrl, publicId } = await uploadThumbnailToCloudinary(finalThumbnailInput);

    const normalizedChapters = finalChapters.length
      ? finalChapters
      : [
          {
            chapterId: 'chapter-1',
            chapterOrder: 1,
            chapterTitle: 'Introduction',
            chapterContent,
          },
        ];

    const newCourse = await courseModel.create({
      title: courseTitle,
      description: courseDescription,
      price: normalizedPrice,
      courseTitle,
      courseDescription,
      coursePrice: normalizedPrice,
      discount: Number(discount) || 0,
      thumbnail: secureUrl,
      thumbnailPublicId: publicId,
      courseThumbnail: secureUrl,
      isPublished: Boolean(isPublished),
      category,
      categories: finalCategories,
      level,
      language,
      instructor: user.name,
      educator: req.userId,
      chapters: normalizedChapters,
      courseContent: normalizedChapters,
    });

    return res.status(201).json({ success: true, message: 'Course created successfully', course: newCourse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .sort({ createdAt: -1 })
      .populate('educator', 'name email')
      .lean();

    const normalizedCourses = courses.map((course) => ({
      ...course,
      courseRatings: [],
    }));

    return res.status(200).json({ success: true, courses: normalizedCourses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate('educator', 'name email')
      .lean();

    const normalizedCourses = courses.map((course) => ({
      ...course,
      courseRatings: [],
    }));

    return res.status(200).json({ success: true, courses: normalizedCourses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await courseModel.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const { error } = await ensureEducator(req.userId);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    const existingCourse = await courseModel.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const payload = { ...req.body };

    const nextThumbnail = payload.thumbnail || payload.courseThumbnail;
    if (nextThumbnail) {
      const { secureUrl, publicId } = await uploadThumbnailToCloudinary(nextThumbnail);

      const cloudinary = getCloudinary();
      if (cloudinary && existingCourse.thumbnailPublicId) {
        await cloudinary.uploader.destroy(existingCourse.thumbnailPublicId);
      }

      payload.thumbnail = secureUrl;
      payload.courseThumbnail = secureUrl;
      payload.thumbnailPublicId = publicId;
    }

    if (payload.price !== undefined) payload.coursePrice = Number(payload.price);
    if (payload.coursePrice !== undefined) payload.price = Number(payload.coursePrice);

    if (payload.categories !== undefined) {
      payload.categories = parseArray(payload.categories, []);
      payload.category = payload.category || payload.categories[0] || existingCourse.category;
    }

    if (payload.chapters !== undefined) {
      payload.chapters = parseArray(payload.chapters, []);
      payload.courseContent = payload.chapters;
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, payload, { new: true });

    return res.status(200).json({ success: true, message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const { error } = await ensureEducator(req.userId);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const cloudinary = getCloudinary();
    if (cloudinary && course.thumbnailPublicId) {
      await cloudinary.uploader.destroy(course.thumbnailPublicId);
    }

    await courseModel.findByIdAndDelete(courseId);

    return res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
