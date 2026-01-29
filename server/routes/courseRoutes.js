const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    getPremiumCourses,
    getFreeCourses,
} = require('../controllers/courseController');
const { optionalAuth } = require('../middleware/auth');
const { getCourseAccessStatus } = require('../middleware/courseAccess');

// Get all courses
router.get('/', getAllCourses);

// Get premium courses
router.get('/premium', getPremiumCourses);

// Get free courses
router.get('/free', getFreeCourses);

// Get single course with access status
router.get('/:id', optionalAuth, getCourseAccessStatus, getCourseById);

module.exports = router;
