const Stripe = require('stripe');

// Initialize Stripe client
const getStripeClient = () => {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
        throw new Error('Stripe secret key not configured');
    }

    const stripe = Stripe(secretKey, {
        apiVersion: '2023-10-16',
    });

    return stripe;
};

// Export singleton instance
const stripe = getStripeClient();

module.exports = stripe;
