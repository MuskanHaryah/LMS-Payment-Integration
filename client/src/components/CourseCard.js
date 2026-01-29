import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
    const { hasPurchasedCourse, isAuthenticated } = useAuth();
    const isPurchased = isAuthenticated && hasPurchasedCourse(course._id);

    return (
        <div className="course-card">
            <div className="course-image">
                <img 
                    src={course.image || '/images/default-course.jpg'} 
                    alt={course.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Course';
                    }}
                />
                {course.isPremium && (
                    <span className="premium-badge">Premium</span>
                )}
                {isPurchased && (
                    <span className="purchased-badge">Purchased</span>
                )}
            </div>
            
            <div className="course-content">
                <div className="course-meta">
                    <span className="course-level">{course.level}</span>
                    <span className="course-duration">{course.duration}</span>
                </div>
                
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">
                    {course.shortDescription || course.description?.substring(0, 100)}...
                </p>
                
                <div className="course-instructor">
                    <span>By {course.instructor}</span>
                </div>

                <div className="course-stats">
                    <span className="course-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {course.rating?.toFixed(1) || '0.0'}
                    </span>
                    <span className="course-students">
                        {course.enrolledStudents} students
                    </span>
                </div>

                <div className="course-footer">
                    <div className="course-price">
                        {course.isPremium ? (
                            <span className="price">${course.price}</span>
                        ) : (
                            <span className="free">Free</span>
                        )}
                    </div>
                    <Link to={`/courses/${course._id}`} className="view-btn">
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
