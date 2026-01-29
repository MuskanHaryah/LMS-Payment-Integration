import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const { user, isAuthenticated, loading } = useAuth();

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
                    {user.purchasedCourses?.length > 0 ? (
                        <div className="purchased-courses">
                            {user.purchasedCourses.map((purchase, index) => (
                                <div key={index} className="purchased-course-item">
                                    <span>Course ID: {purchase.course?._id || purchase.course}</span>
                                    <span>Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-courses">You have not purchased any courses yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
