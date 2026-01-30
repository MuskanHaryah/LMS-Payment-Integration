const Course = require('../models/Course');
const mongoose = require('mongoose');

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
        const { id } = req.params;
        
        // Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid course ID format',
            });
        }

        const course = await Course.findById(id);

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
