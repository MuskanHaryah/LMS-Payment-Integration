# LMS Payment Integration

A Learning Management System with PayPal payment integration for premium courses.

## Project Structure

```
LMS-Payment-Integration/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── services/       # API service functions
│       └── styles/         # CSS stylesheets
├── server/                 # Node.js/Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   └── routes/             # API routes
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Features

- Secure PayPal payment integration
- Premium course access control
- User authentication with JWT
- Elegant sage green theme UI

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install server dependencies: `cd server && npm install`
4. Install client dependencies: `cd client && npm install`
5. Start the server: `cd server && npm run dev`
6. Start the client: `cd client && npm start`

## Environment Variables

See `.env.example` for required environment variables.