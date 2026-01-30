import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    useEffect(() => {
        if (user?.purchasedCourses?.length > 0) {
            fetchPurchasedCourses();
        } else {
            setLoadingCourses(false);
        }
    }, [user]);

    const fetchPurchasedCourses = async () => {
        try {
            const coursePromises = user.purchasedCourses.map(async (purchase) => {
                const courseId = purchase.course?._id || purchase.course;
                try {
                    const response = await courseAPI.getById(courseId);
                    return {
                        ...response.data.course,
                        purchasedAt: purchase.purchasedAt
                    };
                } catch {
                    return null;
                }
            });
            
            const courses = await Promise.all(coursePromises);
            setPurchasedCourses(courses.filter(c => c !== null));
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoadingCourses(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>

                <div className="profile-section">
                    <h2>My Purchased Courses</h2>
                    {loadingCourses ? (
                        <p className="loading-text">Loading your courses...</p>
                    ) : purchasedCourses.length > 0 ? (
                        <div className="purchased-courses">
                            {purchasedCourses.map((course) => (
                                <div key={course._id} className="purchased-course-card">
                                    <img 
                                        src={course.image || '/images/course-thumbnail.png'} 
                                        alt={course.title}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/120x80?text=Course';
                                        }}
                                    />
                                    <div className="course-details">
                                        <h3>{course.title}</h3>
                                        <p className="instructor">By {course.instructor}</p>
                                        <p className="purchase-date">
                                            Purchased: {new Date(course.purchasedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Link to={`/courses/${course._id}/learn`} className="access-btn">
                                        Continue Learning
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-courses">
                            <p>You have not purchased any courses yet.</p>
                            <Link to="/courses" className="browse-btn">Browse Courses</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
