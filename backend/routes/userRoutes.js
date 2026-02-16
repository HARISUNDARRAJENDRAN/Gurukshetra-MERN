import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {
	becomeEducator,
	fetchEducatorCourses,
	fetchEducatorDashboardData,
	fetchUserCourseProgress,
	updateCourseProgress,
	fetchUserCourseRating,
	updateCourseRating,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/become-educator', userAuth, becomeEducator);
userRouter.get('/educator-courses', userAuth, fetchEducatorCourses);
userRouter.get('/dashboard-data', userAuth, fetchEducatorDashboardData);
userRouter.get('/course-progress/:courseId', userAuth, fetchUserCourseProgress);
userRouter.post('/course-progress', userAuth, updateCourseProgress);
userRouter.get('/course-rating/:courseId', userAuth, fetchUserCourseRating);
userRouter.post('/course-rating', userAuth, updateCourseRating);

export default userRouter;
