import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/PaymentResult.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const { courseId, courseName, amount } = location.state || {};

    return (
        <div className="payment-result-page">
            <div className="payment-result-card success">
                <div className="result-icon success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="64" height="64">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                </div>
                
                <h1>Payment Successful</h1>
                <p className="result-message">
                    Thank you for your purchase! Your payment has been processed successfully.
                </p>

                {courseName && (
                    <div className="purchase-details">
                        <div className="detail-item">
                            <span className="label">Course</span>
                            <span className="value">{courseName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Amount Paid</span>
                            <span className="value">${amount}</span>
                        </div>
                    </div>
                )}

                <div className="result-actions">
                    {courseId ? (
                        <Link to={`/courses/${courseId}/learn`} className="btn btn-primary">
                            Start Learning Now
                        </Link>
                    ) : (
                        <Link to="/courses" className="btn btn-primary">
                            Browse Courses
                        </Link>
                    )}
                    <Link to="/profile" className="btn btn-secondary">
                        View My Courses
                    </Link>
                </div>

                <p className="confirmation-note">
                    A confirmation email has been sent to your registered email address.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
