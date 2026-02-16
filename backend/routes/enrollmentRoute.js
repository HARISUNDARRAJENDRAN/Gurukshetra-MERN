import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { enrollCourse, getUserEnrollments } from '../controller/enrollmentController.js';

const router = express.Router();

router.post('/create', userAuth, enrollCourse);
router.get('/my', userAuth, getUserEnrollments);

export default router;
