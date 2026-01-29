import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles/PaymentResult.css';

const PaymentFailed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { error, courseId } = location.state || {};

    return (
        <div className="payment-result-page">
            <div className="payment-result-card failed">
                <div className="result-icon failed">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="64" height="64">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                </div>
                
                <h1>Payment Failed</h1>
                <p className="result-message">
                    We were unable to process your payment. Please try again.
                </p>

                {error && (
                    <div className="error-details">
                        <span className="error-label">Error Details:</span>
                        <span className="error-message">{error}</span>
                    </div>
                )}

                <div className="common-issues">
                    <h3>Common Issues</h3>
                    <ul>
                        <li>Insufficient funds in your account</li>
                        <li>Card details entered incorrectly</li>
                        <li>Card expired or blocked for online transactions</li>
                        <li>Bank declined the transaction</li>
                    </ul>
                </div>

                <div className="result-actions">
                    {courseId ? (
                        <button 
                            onClick={() => navigate(`/checkout/${courseId}`)}
                            className="btn btn-primary"
                        >
                            Try Again
                        </button>
                    ) : (
                        <button 
                            onClick={() => navigate(-1)}
                            className="btn btn-primary"
                        >
                            Go Back
                        </button>
                    )}
                    <Link to="/courses" className="btn btn-secondary">
                        Browse Courses
                    </Link>
                </div>

                <p className="support-note">
                    Need help? Contact our support team for assistance.
                </p>
            </div>
        </div>
    );
};

export default PaymentFailed;
