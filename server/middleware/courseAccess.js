const Course = require('../models/Course');
const User = require('../models/User');

// Check if user has access to premium course
const checkCourseAccess = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        // Get the course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        // If course is free, allow access
        if (!course.isPremium || course.price === 0) {
            req.course = course;
            req.hasAccess = true;
            return next();
        }

        // For premium courses, check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access premium content',
                requiresAuth: true,
                requiresPurchase: true,
            });
        }

        // Check if user has purchased this course
        const hasPurchased = req.user.hasPurchasedCourse(courseId);

        if (!hasPurchased) {
            return res.status(403).json({
                success: false,
                message: 'Please purchase this course to access content',
                requiresPurchase: true,
                courseId: courseId,
                price: course.price,
            });
        }

        req.course = course;
        req.hasAccess = true;
        next();
    } catch (error) {
        console.error('Course access error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error checking course access',
        });
    }
};

// Get course access status without blocking
const getCourseAccessStatus = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        req.course = course;

        // Free course - everyone has access
        if (!course.isPremium || course.price === 0) {
            req.hasAccess = true;
            req.accessStatus = 'free';
            return next();
        }

        // Premium course - check purchase status
        if (!req.user) {
            req.hasAccess = false;
            req.accessStatus = 'requires_auth';
            return next();
        }

        const hasPurchased = req.user.hasPurchasedCourse(courseId);
        req.hasAccess = hasPurchased;
        req.accessStatus = hasPurchased ? 'purchased' : 'requires_purchase';
        
        next();
    } catch (error) {
        console.error('Course access status error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error checking course access status',
        });
    }
};

module.exports = {
    checkCourseAccess,
    getCourseAccessStatus,
};
