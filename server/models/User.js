const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false,
    },
    purchasedCourses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        purchasedAt: {
            type: Date,
            default: Date.now,
        },
        paymentId: {
            type: String,
        },
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Check if user has purchased a course
userSchema.methods.hasPurchasedCourse = function(courseId) {
    return this.purchasedCourses.some(
        purchase => purchase.course.toString() === courseId.toString()
    );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
