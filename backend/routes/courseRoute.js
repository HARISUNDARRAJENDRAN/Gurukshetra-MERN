import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
  deleteCourse,
  fetchPublishedCourses,
} from '../controller/courseController.js';

const router = express.Router();

router.post('/create', userAuth, createCourse);
router.get('/all', getAllCourses);
router.get('/published', fetchPublishedCourses);
router.get('/:courseId', getCourseDetails);
router.put('/:courseId', userAuth, updateCourse);
router.delete('/:courseId', userAuth, deleteCourse);

export default router;
