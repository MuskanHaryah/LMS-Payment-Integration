const express = require('express');
const router = express.Router();
const {
    createPaymentIntent,
    confirmPayment,
    getPaymentHistory,
    getStripeConfig,
} = require('../controllers/paymentController');

// Get Stripe publishable key
router.get('/config', getStripeConfig);

// Create payment intent for course purchase
router.post('/create-payment-intent', createPaymentIntent);

// Confirm payment after completion
router.post('/confirm', confirmPayment);

// Get user payment history (requires auth - to be added)
router.get('/history', getPaymentHistory);

module.exports = router;
