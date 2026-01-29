import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Elevate Your Skills</h1>
                    <p>
                        Access premium courses designed to help you master new skills 
                        and advance your career. Learn from industry experts at your own pace.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/courses" className="btn btn-primary">
                            Browse Courses
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3>Expert Instructors</h3>
                        <p>Learn from industry professionals with years of experience</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3>Lifetime Access</h3>
                        <p>Purchase once and access your courses forever</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3>Secure Payments</h3>
                        <p>Safe and secure payment processing with Stripe</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Start Learning?</h2>
                <p>Join thousands of students already learning on our platform</p>
                <Link to="/courses" className="btn btn-primary">
                    View All Courses
                </Link>
            </section>
        </div>
    );
};

export default Home;
