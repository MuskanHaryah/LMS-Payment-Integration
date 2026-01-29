const { Client, Environment, LogLevel } = require('@paypal/paypal-server-sdk');

// Initialize PayPal client
const getPayPalClient = () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured');
    }

    const client = new Client({
        clientCredentialsAuthCredentials: {
            oAuthClientId: clientId,
            oAuthClientSecret: clientSecret,
        },
        timeout: 0,
        environment: mode === 'sandbox' ? Environment.Sandbox : Environment.Production,
        logging: {
            logLevel: LogLevel.Info,
            logRequest: { logBody: true },
            logResponse: { logHeaders: true },
        },
    });

    return client;
};

module.exports = { getPayPalClient };
