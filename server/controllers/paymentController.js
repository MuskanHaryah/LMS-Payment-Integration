const stripe = require('../config/stripe');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Create a payment intent for course purchase
const createPaymentIntent = async (req, res) => {
    try {
        const { amount, courseId, courseName } = req.body;

        if (!amount || !courseId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Amount and courseId are required' 
            });
        }

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                courseId,
                courseName: courseName || '',
                userId: req.user ? req.user._id.toString() : 'guest',
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Payment Intent Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create payment intent',
            error: error.message 
        });
    }
};

// Confirm payment and grant course access
const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Payment intent ID is required' 
            });
        }

        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const { courseId } = paymentIntent.metadata;
            // Use authenticated user's ID instead of metadata (more secure)
            const userId = req.user._id;
            
            // Save payment record to database
            const payment = await Payment.create({
                user: userId,
                course: courseId,
                amount: paymentIntent.amount / 100,
                stripePaymentIntentId: paymentIntentId,
                status: 'succeeded',
            });

            // Add course to user's purchased courses
            await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        purchasedCourses: {
                            course: courseId,
                            purchasedAt: new Date(),
                            paymentId: payment._id.toString(),
                        }
                    }
                }
            );

            // Get updated user to return
            const updatedUser = await User.findById(userId).select('-password');

            res.status(200).json({
                success: true,
                message: 'Payment confirmed successfully',
                courseId: courseId,
                status: paymentIntent.status,
                user: updatedUser,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment not completed',
                status: paymentIntent.status,
            });
        }
    } catch (error) {
        console.error('Payment Confirmation Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to confirm payment',
            error: error.message 
        });
    }
};

// Get payment history for a user
const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;

        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not authenticated' 
            });
        }

        // For now, return empty array - will integrate with Payment model later
        res.status(200).json({
            success: true,
            payments: [],
        });
    } catch (error) {
        console.error('Payment History Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve payment history',
            error: error.message 
        });
    }
};

// Get Stripe publishable key for frontend
const getStripeConfig = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to get Stripe config' 
        });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment,
    getPaymentHistory,
    getStripeConfig,
};
