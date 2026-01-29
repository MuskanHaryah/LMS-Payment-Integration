const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const sampleCourses = [
    {
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course covers everything from basic markup to responsive design principles.',
        shortDescription: 'Master the essentials of web development',
        price: 0,
        isPremium: false,
        instructor: 'Sarah Johnson',
        duration: '8 hours',
        lessons: 24,
        level: 'Beginner',
        category: 'Web Development',
        features: ['HTML5 & CSS3', 'JavaScript Basics', 'Responsive Design', 'Project-Based Learning'],
        enrolledStudents: 1250,
        rating: 4.5,
    },
    {
        title: 'Advanced React Development',
        description: 'Master React.js with hooks, context, Redux, and modern patterns. Build production-ready applications with best practices and advanced techniques.',
        shortDescription: 'Build professional React applications',
        price: 49.99,
        isPremium: true,
        instructor: 'Michael Chen',
        duration: '16 hours',
        lessons: 48,
        level: 'Advanced',
        category: 'Web Development',
        features: ['React Hooks', 'State Management', 'Performance Optimization', 'Testing'],
        enrolledStudents: 890,
        rating: 4.8,
    },
    {
        title: 'Node.js Backend Mastery',
        description: 'Build scalable backend services with Node.js, Express, and MongoDB. Learn authentication, API design, and deployment strategies.',
        shortDescription: 'Create powerful server-side applications',
        price: 59.99,
        isPremium: true,
        instructor: 'David Williams',
        duration: '20 hours',
        lessons: 56,
        level: 'Intermediate',
        category: 'Backend Development',
        features: ['REST APIs', 'Authentication', 'Database Design', 'Deployment'],
        enrolledStudents: 720,
        rating: 4.7,
    },
    {
        title: 'UI/UX Design Principles',
        description: 'Learn the fundamentals of user interface and user experience design. Create beautiful, intuitive designs that users love.',
        shortDescription: 'Design stunning user experiences',
        price: 0,
        isPremium: false,
        instructor: 'Emily Davis',
        duration: '6 hours',
        lessons: 18,
        level: 'Beginner',
        category: 'Design',
        features: ['Design Thinking', 'Wireframing', 'Prototyping', 'User Research'],
        enrolledStudents: 1580,
        rating: 4.6,
    },
    {
        title: 'Full Stack Development Bootcamp',
        description: 'Comprehensive full-stack development course covering React, Node.js, MongoDB, and deployment. Build complete applications from scratch.',
        shortDescription: 'Become a complete full-stack developer',
        price: 99.99,
        isPremium: true,
        instructor: 'Alex Thompson',
        duration: '40 hours',
        lessons: 120,
        level: 'Intermediate',
        category: 'Web Development',
        features: ['Frontend & Backend', 'Database Integration', 'Authentication', 'Cloud Deployment'],
        enrolledStudents: 2100,
        rating: 4.9,
    },
    {
        title: 'Python for Data Science',
        description: 'Introduction to Python programming with focus on data analysis, visualization, and machine learning fundamentals.',
        shortDescription: 'Start your data science journey',
        price: 79.99,
        isPremium: true,
        instructor: 'Lisa Anderson',
        duration: '24 hours',
        lessons: 72,
        level: 'Intermediate',
        category: 'Data Science',
        features: ['Python Basics', 'Pandas & NumPy', 'Data Visualization', 'ML Introduction'],
        enrolledStudents: 1650,
        rating: 4.7,
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-payment');
        console.log('Connected to MongoDB');

        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses');

        // Insert sample courses
        const courses = await Course.insertMany(sampleCourses);
        console.log(`Inserted ${courses.length} sample courses`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
