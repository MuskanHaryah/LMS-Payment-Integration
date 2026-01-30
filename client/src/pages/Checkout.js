import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { courseAPI, paymentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ course, clientSecret, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            }
        );

        if (stripeError) {
            setError(stripeError.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#3D4A38',
                '::placeholder': {
                    color: '#8B9A7D',
                },
            },
            invalid: {
                color: '#C62828',
            },
        },
        hidePostalCode: true,
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
                <h3>Payment Details</h3>
                <div className="card-element-container">
                    <CardElement options={cardElementOptions} />
                </div>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button 
                type="submit" 
                className="pay-btn"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : `Pay $${course.price}`}
            </button>

            <div className="secure-notice">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure payment powered by Stripe</span>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, updateUser, loading: authLoading } = useAuth();
    
    const [course, setCourse] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Wait for auth to finish loading before checking
        if (authLoading) return;
        
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/checkout/${courseId}` } });
            return;
        }
        
        fetchCourseAndCreateIntent();
    }, [courseId, isAuthenticated, authLoading]);

    const fetchCourseAndCreateIntent = async () => {
        try {
            setLoading(true);
            
            // Fetch course details
            const courseResponse = await courseAPI.getById(courseId);
            const courseData = courseResponse.data.course;
            setCourse(courseData);

            // Create payment intent
            const paymentResponse = await paymentAPI.createPaymentIntent({
                amount: courseData.price,
                courseId: courseData._id,
                courseName: courseData.title,
            });

            setClientSecret(paymentResponse.data.clientSecret);
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Failed to load checkout');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            // Confirm payment on backend - this saves to database
            const response = await paymentAPI.confirmPayment({
                paymentIntentId: paymentIntent.id,
            });

            // Update user with the server response (includes purchasedCourses from DB)
            if (response.data.user) {
                updateUser(response.data.user);
            } else {
                // Fallback: Update locally if server doesn't return user
                const updatedUser = {
                    ...user,
                    purchasedCourses: [
                        ...(user.purchasedCourses || []),
                        { course: courseId, purchasedAt: new Date().toISOString() }
                    ]
                };
                updateUser(updatedUser);
            }

            // Navigate to success page
            navigate('/payment/success', { 
                state: { 
                    courseId,
                    courseName: course.title,
                    amount: course.price
                } 
            });
        } catch (err) {
            console.error('Confirmation error:', err);
            navigate('/payment/failed', {
                state: { error: 'Payment succeeded but confirmation failed' }
            });
        }
    };

    if (loading) {
        return <div className="loading">Loading checkout...</div>;
    }

    if (error) {
        return (
            <div className="checkout-page">
                <div className="checkout-error-page">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/courses')} className="btn btn-primary">
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    if (!course) {
        return <div className="loading">Course not found</div>;
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Complete Your Purchase</h1>
                    <p>You are one step away from accessing this course</p>
                </div>

                <div className="checkout-content">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="course-item">
                            <img 
                                src={course.image || 'https://via.placeholder.com/100x70?text=Course'} 
                                alt={course.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x70?text=Course';
                                }}
                            />
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>By {course.instructor}</p>
                            </div>
                        </div>

                        <div className="order-details">
                            <div className="detail-row">
                                <span>Course Price</span>
                                <span>${course.price}</span>
                            </div>
                            <div className="detail-row total">
                                <span>Total</span>
                                <span>${course.price}</span>
                            </div>
                        </div>

                        <div className="course-includes-checkout">
                            <h4>What is included:</h4>
                            <ul>
                                <li>{course.duration} of content</li>
                                <li>{course.lessons} lessons</li>
                                <li>Full lifetime access</li>
                                <li>Certificate of completion</li>
                            </ul>
                        </div>
                    </div>

                    <div className="payment-section">
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm 
                                    course={course} 
                                    clientSecret={clientSecret}
                                    onSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
