const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
    },
    shortDescription: {
        type: String,
        maxlength: 200,
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: 0,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: '/images/default-course.jpg',
    },
    instructor: {
        type: String,
        required: [true, 'Instructor name is required'],
    },
    duration: {
        type: String,
        default: '0 hours',
    },
    lessons: {
        type: Number,
        default: 0,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
    },
    features: [{
        type: String,
    }],
    enrolledStudents: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
