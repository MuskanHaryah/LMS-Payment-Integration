const Course = require('../models/Course');

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
        });
    }
};

// Get single course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        // Include access status if available from middleware
        res.status(200).json({
            success: true,
            course,
            hasAccess: req.hasAccess || false,
            accessStatus: req.accessStatus || 'unknown',
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching course',
        });
    }
};

// Get premium courses only
const getPremiumCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPremium: true, isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    } catch (error) {
        console.error('Get premium courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching premium courses',
        });
    }
};

// Get free courses only
const getFreeCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPremium: false, isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    } catch (error) {
        console.error('Get free courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching free courses',
        });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getPremiumCourses,
    getFreeCourses,
};
