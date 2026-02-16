import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    duration: { type: Number, default: 0 },
    lectureDuration: { type: Number, default: 0 },
    lectureURL: { type: String, default: '' },
    lectureUrl: { type: String, default: '' },
    isPreviewFree: { type: Boolean, default: false },
    lectureOrder: { type: Number, default: 1 },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, default: 1 },
    chapterTitle: { type: String, required: true },
    collapsed: { type: Boolean, default: false },
    chapterContent: { type: [lectureSchema], default: [] },
  },
  { _id: false }
);

const courseRatingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    thumbnailPublicId: { type: String, default: '' },
    categories: { type: [String], required: true, default: [] },
    instructor: { type: String, required: true },
    rating: { type: [courseRatingSchema], default: [] },
    lectures: { type: [lectureSchema], default: [] },
    chapters: { type: [chapterSchema], default: [] },
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    coursePrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, default: 0, min: 0, max: 100 },
    courseThumbnail: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    category: { type: String, default: 'General' },
    level: { type: String, default: 'Beginner' },
    language: { type: String, default: 'English' },
    educator: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    enrolledStudents: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], default: [] },
    courseContent: { type: [chapterSchema], default: [] },
  },
  { timestamps: true }
);

courseSchema.pre('validate', function (next) {
  this.courseTitle = this.courseTitle || this.title;
  this.title = this.title || this.courseTitle;

  this.courseDescription = this.courseDescription || this.description;
  this.description = this.description || this.courseDescription;

  if (this.coursePrice === undefined || this.coursePrice === null) {
    this.coursePrice = this.price;
  }
  if (this.price === undefined || this.price === null) {
    this.price = this.coursePrice;
  }

  this.courseThumbnail = this.courseThumbnail || this.thumbnail || 'https://placehold.co/600x340?text=Course';
  this.thumbnail = this.thumbnail || this.courseThumbnail;

  this.categories = this.categories?.length ? this.categories : [this.category || 'General'];
  this.category = this.category || this.categories[0] || 'General';

  this.instructor = this.instructor || 'Educator';

  if ((!this.lectures || this.lectures.length === 0) && this.courseContent?.length) {
    this.lectures = this.courseContent.flatMap((chapter) => chapter.chapterContent || []);
  }

  if ((!this.courseContent || this.courseContent.length === 0) && this.lectures?.length) {
    this.courseContent = [
      {
        chapterId: 'chapter-1',
        chapterOrder: 1,
        chapterTitle: 'Lectures',
        collapsed: false,
        chapterContent: this.lectures,
      },
    ];
  }

  this.chapters = this.chapters?.length ? this.chapters : this.courseContent;
  this.courseContent = this.courseContent?.length ? this.courseContent : this.chapters;

  this.courseContent = (this.courseContent || []).map((chapter) => ({
    ...chapter,
    chapterContent: (chapter.chapterContent || []).map((lecture) => ({
      ...lecture,
      lectureDuration: lecture.lectureDuration || lecture.duration || 0,
      duration: lecture.duration || lecture.lectureDuration || 0,
      lectureUrl: lecture.lectureUrl || lecture.lectureURL || '',
      lectureURL: lecture.lectureURL || lecture.lectureUrl || '',
    })),
  }));

  next();
});

const courseModel = mongoose.models.course || mongoose.model('course', courseSchema);

export default courseModel;
