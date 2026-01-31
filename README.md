# 🎓 LMS Payment Integration

<div align="center">
  <img src="image.png" alt="LMS Platform" width="800" style="border-radius: 10px; margin: 20px 0;" />
  
  *A modern Learning Management System with seamless Stripe payment integration*
  
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
</div>

---

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based secure authentication
- Protected routes and middleware
- Bcrypt password hashing

### 💳 **Payment Integration**
- Stripe Payment Intents API
- Secure payment processing
- Payment history tracking
- Real-time payment confirmation

### 📚 **Course Management** 
- Premium and free course tiers
- Dynamic course access control
- Course enrollment tracking
- Rich course content delivery

### 🎨 **Modern UI/UX**
- Elegant sage green theme
- Responsive design
- Interactive components
- Smooth user experience

### 🔄 **Data Persistence**
- MongoDB database integration
- Purchase history persistence
- User profile management
- Session management

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
├─────────────────────────────────────────────────────────────┤
│  Components │  Pages  │  Services  │  Context  │  Styles   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (Express)                   │
├─────────────────────────────────────────────────────────────┤
│  Routes  │  Middleware  │  Controllers  │  Authentication  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (MongoDB)                       │
├─────────────────────────────────────────────────────────────┤
│     Users     │    Courses    │   Payments   │   Sessions   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Payment Gateway (Stripe)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- Stripe Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LMS-Payment-Integration
   ```

2. **Environment Setup**
   ```bash
   # Server environment
   cp server/.env.example server/.env
   
   # Client environment  
   cp client/.env.example client/.env
   ```

3. **Install Dependencies**
   ```bash
   # Backend dependencies
   cd server && npm install
   
   # Frontend dependencies
   cd ../client && npm install
   ```

4. **Configure Environment Variables**
   ```bash
   # server/.env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lms-payment
   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   
   # client/.env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

5. **Launch the Application**
   ```bash
   # Start backend server (Terminal 1)
   cd server && npm start
   
   # Start frontend app (Terminal 2) 
   cd client && npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
LMS-Payment-Integration/
├── 📂 client/                    # React Frontend Application
│   ├── 📂 public/               # Static assets
│   │   └── 📂 images/           # Course thumbnails & icons
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable UI components
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   └── ConfirmModal.js  # Confirmation dialogs
│   │   ├── 📂 pages/            # Page components
│   │   │   ├── Home.js          # Landing page
│   │   │   ├── Login.js         # Authentication
│   │   │   ├── Courses.js       # Course catalog
│   │   │   ├── Checkout.js      # Payment processing
│   │   │   └── Profile.js       # User dashboard
│   │   ├── 📂 services/         # API integration
│   │   │   └── api.js           # HTTP client & endpoints
│   │   ├── 📂 context/          # Global state management
│   │   │   └── AuthContext.js   # Authentication state
│   │   └── 📂 styles/           # Component stylesheets
│   └── 📄 package.json          # Frontend dependencies
├── 📂 server/                    # Node.js Backend API
│   ├── 📂 config/               # Configuration modules
│   │   ├── database.js          # MongoDB connection
│   │   └── stripe.js            # Stripe configuration
│   ├── 📂 controllers/          # Business logic
│   │   ├── authController.js    # Authentication logic
│   │   ├── courseController.js  # Course management
│   │   └── paymentController.js # Payment processing
│   ├── 📂 middleware/           # Custom middleware
│   │   ├── auth.js              # JWT authentication
│   │   └── courseAccess.js      # Course access control
│   ├── 📂 models/               # Database schemas
│   │   ├── User.js              # User data model
│   │   ├── Course.js            # Course data model
│   │   └── Payment.js           # Payment records
│   ├── 📂 routes/               # API endpoints
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── courseRoutes.js      # Course management routes
│   │   └── paymentRoutes.js     # Payment processing routes
│   ├── 📄 index.js              # Server entry point
│   ├── 📄 seed.js               # Database seeding
│   └── 📄 package.json          # Backend dependencies
├── 📄 .gitignore                # Git ignore rules
└── 📄 README.md                 # Project documentation
```

---

## 🧪 Testing

### Test Payment Cards
Use these Stripe test cards for payment testing:

| Card Number | Purpose | Expected Result |
|------------|---------|-----------------|
| `4242 4242 4242 4242` | Success | Payment completes successfully |
| `4000 0000 0000 0002` | Decline | Payment fails - card declined |
| `4000 0000 0000 9995` | Insufficient funds | Payment fails - insufficient funds |

**Test Details:**
- Expiry: Any future date (e.g., 12/28)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

---

## 🔧 API Endpoints

### Authentication
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
```

### Courses
```http
GET  /api/courses          # Get all courses
GET  /api/courses/:id      # Get specific course
GET  /api/courses/:id/learn # Access course content (protected)
```

### Payments
```http
GET  /api/payments/config           # Get Stripe configuration
POST /api/payments/create-payment-intent # Create payment intent
POST /api/payments/confirm          # Confirm payment
GET  /api/payments/history          # Payment history
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing  
- **Axios** - HTTP client for API calls
- **Stripe Elements** - Secure payment forms
- **CSS3** - Custom styling with sage green theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Stripe SDK** - Payment processing

### Development Tools
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  Made with ❤️ for modern online learning
</div>