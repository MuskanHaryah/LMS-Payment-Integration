const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createPaymentIntent,
    confirmPayment,
    getPaymentHistory,
    getStripeConfig,
} = require('../controllers/paymentController');

// Get Stripe publishable key
router.get('/config', getStripeConfig);

// Create payment intent for course purchase (requires auth)
router.post('/create-payment-intent', protect, createPaymentIntent);

// Confirm payment after completion (requires auth)
router.post('/confirm', protect, confirmPayment);

// Get user payment history (requires auth)
router.get('/history', protect, getPaymentHistory);

module.exports = router;
