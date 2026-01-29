import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/CourseDetail.css';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, hasPurchasedCourse } = useAuth();
    
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const response = await courseAPI.getById(id);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/courses/${id}` } });
            return;
        }

        if (course.isPremium && !hasPurchasedCourse(course._id)) {
            navigate(`/checkout/${course._id}`);
        } else {
            // Free course or already purchased - go to course content
            navigate(`/courses/${course._id}/learn`);
        }
    };

    if (loading) {
        return <div className="loading">Loading course...</div>;
    }

    if (!course) {
        return <div className="not-found">Course not found</div>;
    }

    const isPurchased = isAuthenticated && hasPurchasedCourse(course._id);
    const hasAccess = !course.isPremium || isPurchased;

    return (
        <div className="course-detail">
            <div className="course-detail-header">
                <div className="course-detail-info">
                    <div className="breadcrumb">
                        <Link to="/courses">Courses</Link> / {course.category}
                    </div>
                    <h1>{course.title}</h1>
                    <p className="course-detail-description">{course.description}</p>
                    
                    <div className="course-detail-meta">
                        <span className="meta-item">
                            <strong>Instructor:</strong> {course.instructor}
                        </span>
                        <span className="meta-item">
                            <strong>Level:</strong> {course.level}
                        </span>
                        <span className="meta-item">
                            <strong>Duration:</strong> {course.duration}
                        </span>
                        <span className="meta-item">
                            <strong>Lessons:</strong> {course.lessons}
                        </span>
                    </div>

                    <div className="course-rating-large">
                        <span className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} viewBox="0 0 24 24" fill={i < Math.round(course.rating) ? 'currentColor' : 'none'} stroke="currentColor" width="20" height="20">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </span>
                        <span className="rating-text">{course.rating?.toFixed(1)} ({course.enrolledStudents} students)</span>
                    </div>
                </div>

                <div className="course-detail-card">
                    <img 
                        src={course.image || 'https://via.placeholder.com/400x250?text=Course'} 
                        alt={course.title}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250?text=Course';
                        }}
                    />
                    <div className="card-content">
                        <div className="price-section">
                            {course.isPremium ? (
                                <>
                                    <span className="price">${course.price}</span>
                                    {isPurchased && <span className="purchased-text">Purchased</span>}
                                </>
                            ) : (
                                <span className="free-text">Free Course</span>
                            )}
                        </div>

                        <button 
                            className={`enroll-btn ${hasAccess ? 'access' : ''}`}
                            onClick={handleEnroll}
                        >
                            {hasAccess ? 'Access Course' : (course.isPremium ? 'Enroll Now' : 'Start Learning')}
                        </button>

                        <ul className="course-includes">
                            <li>{course.duration} of content</li>
                            <li>{course.lessons} lessons</li>
                            <li>Full lifetime access</li>
                            <li>Certificate of completion</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="course-detail-body">
                <section className="course-features">
                    <h2>What You Will Learn</h2>
                    <ul className="features-list">
                        {course.features?.map((feature, index) => (
                            <li key={index}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default CourseDetail;
