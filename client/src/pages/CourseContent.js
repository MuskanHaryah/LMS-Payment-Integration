import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/CourseContent.css';

const CourseContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, hasPurchasedCourse } = useAuth();
    
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [activeLesson, setActiveLesson] = useState(0);

    useEffect(() => {
        checkAccessAndFetch();
    }, [id, isAuthenticated]);

    const checkAccessAndFetch = async () => {
        try {
            setLoading(true);
            const response = await courseAPI.getById(id);
            const courseData = response.data.course;
            setCourse(courseData);

            // Check access
            if (!courseData.isPremium) {
                setHasAccess(true);
            } else if (isAuthenticated && hasPurchasedCourse(courseData._id)) {
                setHasAccess(true);
            } else {
                setHasAccess(false);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading course content...</div>;
    }

    if (!course) {
        return <div className="not-found">Course not found</div>;
    }

    if (!hasAccess) {
        return (
            <div className="access-denied">
                <div className="access-denied-card">
                    <div className="lock-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="64" height="64">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </div>
                    <h2>Premium Content</h2>
                    <p>This course requires a purchase to access the content.</p>
                    <div className="access-denied-actions">
                        <button 
                            onClick={() => navigate(`/checkout/${course._id}`)}
                            className="btn btn-primary"
                        >
                            Purchase for ${course.price}
                        </button>
                        <Link to={`/courses/${course._id}`} className="btn btn-secondary">
                            View Course Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Sample lessons content
    const lessons = [
        { id: 1, title: 'Introduction to the Course', duration: '10:30', type: 'video' },
        { id: 2, title: 'Getting Started with Basics', duration: '15:45', type: 'video' },
        { id: 3, title: 'Core Concepts Explained', duration: '20:00', type: 'video' },
        { id: 4, title: 'Hands-on Practice', duration: '25:15', type: 'video' },
        { id: 5, title: 'Advanced Techniques', duration: '18:30', type: 'video' },
        { id: 6, title: 'Real-world Applications', duration: '22:00', type: 'video' },
        { id: 7, title: 'Best Practices', duration: '16:45', type: 'video' },
        { id: 8, title: 'Final Project', duration: '30:00', type: 'project' },
    ];

    return (
        <div className="course-content-page">
            <div className="content-sidebar">
                <div className="sidebar-header">
                    <Link to={`/courses/${course._id}`} className="back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Overview
                    </Link>
                    <h3>{course.title}</h3>
                </div>
                
                <div className="lessons-list">
                    <h4>Course Content</h4>
                    {lessons.map((lesson, index) => (
                        <button
                            key={lesson.id}
                            className={`lesson-item ${activeLesson === index ? 'active' : ''}`}
                            onClick={() => setActiveLesson(index)}
                        >
                            <div className="lesson-number">{index + 1}</div>
                            <div className="lesson-info">
                                <span className="lesson-title">{lesson.title}</span>
                                <span className="lesson-duration">{lesson.duration}</span>
                            </div>
                            {lesson.type === 'project' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>

                <div className="progress-section">
                    <div className="progress-header">
                        <span>Progress</span>
                        <span>0/{lessons.length} completed</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '0%' }}></div>
                    </div>
                </div>
            </div>

            <div className="content-main">
                <div className="video-container">
                    <div className="video-placeholder">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="80">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <p>Click play to start the lesson</p>
                    </div>
                </div>

                <div className="lesson-details">
                    <h2>{lessons[activeLesson].title}</h2>
                    <div className="lesson-meta">
                        <span className="lesson-type">
                            {lessons[activeLesson].type === 'project' ? 'Project' : 'Video Lesson'}
                        </span>
                        <span className="lesson-time">{lessons[activeLesson].duration}</span>
                    </div>
                    
                    <div className="lesson-description">
                        <p>
                            Welcome to this lesson on {lessons[activeLesson].title.toLowerCase()}. 
                            In this section, you will learn the key concepts and techniques 
                            that will help you master {course.title}.
                        </p>
                    </div>

                    <div className="lesson-actions">
                        <button 
                            className="btn btn-secondary"
                            disabled={activeLesson === 0}
                            onClick={() => setActiveLesson(prev => prev - 1)}
                        >
                            Previous Lesson
                        </button>
                        <button className="btn btn-primary mark-complete">
                            Mark as Complete
                        </button>
                        <button 
                            className="btn btn-secondary"
                            disabled={activeLesson === lessons.length - 1}
                            onClick={() => setActiveLesson(prev => prev + 1)}
                        >
                            Next Lesson
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
