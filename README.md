# 🌾 FarmEasy - Agricultural Collaboration Platform

FarmEasy is a comprehensive platform designed to connect farmers with buyers, enabling transparent contract-based agricultural transactions. This project facilitates direct collaboration between agricultural producers and consumers, built with modern web technologies.

## 📁 Folder Structure

```
FarmEasy/
├── server/        # Node.js + Express server
├── client/        # React client application
```

## 🚀 Tech Stack

**Client:**

- React.js
- TailwindCSS / Material-UI
- Redux Toolkit (state management)
- Axios (API calls)
- React Router

**Server:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)


## 🧪 Features (Planned)

### Core Features

- [x] User authentication (Farmers & Buyers)
- [x] Contract creation and management
- [x] Product catalog with pricing
- [ ] Order tracking and fulfillment
- [ ] Payment integration
- [ ] Document management (contracts, certificates)

### User Roles

- **Farmers:** Create profiles, list products, manage contracts
- **Buyers:** Browse products, create purchase contracts, track orders
- **Admin:** Platform management, user verification, dispute resolution

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm 
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yassshhhh22/Contract-Farming.git
cd Contract-Farming
```

### 2. Setup Environment Variables

Create `.env` files in both server and client directories:

**Server (.env):**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/farmeasy
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Client (.env):**

```env
VITE_API_URL=http://localhost:5000
```

### 3. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 4. Run the Application

```bash
# Start MongoDB (if running locally)
mongod

# In one terminal (server)
cd server
npm run dev

# In another terminal (client)
cd ../client
npm run dev
```

## 📱 API Endpoints

### Authentication & Users

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `POST /api/users/refresh` - Refresh JWT token
- `GET /api/users/verify` - Verify JWT token
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile

### Admin-only User Management

- `GET /api/users/all` - Get all users (admin only)
- `GET /api/users/buyers` - Get all buyers (admin only)
- `GET /api/users/farmers` - Get all farmers (admin only)
- `PATCH /api/users/change-role/:id` - Change user role (admin only)
- `DELETE /api/users/delete/:id` - Delete user (admin only)

### Crops/Products

- `POST /api/crops/add` - Add new crop listing (farmer only)
- `GET /api/crops/all` - Get all active crops
- `GET /api/crops/my-crops` - Get farmer's own crops (farmer only)
- `GET /api/crops/flash-deals` - Get flash deal crops
- `GET /api/crops/search` - Search crops by various criteria
- `GET /api/crops/:id` - Get specific crop details
- `PATCH /api/crops/edit/:id` - Update crop listing (farmer only)
- `DELETE /api/crops/delete/:id` - Delete crop listing (farmer only)

### Contracts

- `POST /api/contracts/create` - Create new contract (buyer only)
- `GET /api/contracts/my-contracts` - Get user's contracts
- `GET /api/contracts/pending` - Get pending contracts (farmer only)
- `GET /api/contracts/active` - Get active contracts
- `GET /api/contracts/:id` - Get specific contract details
- `PATCH /api/contracts/update-status/:id` - Update contract status (farmer only)

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  userType: ["farmer", "buyer", "admin"],
  location: String,
  bio: String,
  company: String,
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Crop Model

```javascript
{
  cropName: String,
  category: String,
  region: String,
  price: Number,
  quantity: Number,
  description: String,
  farmer: ObjectId,
  status: ["Active", "Sold", "Expired"],
  isFlashDeal: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contract Model

```javascript
{
  crop: ObjectId,
  buyer: ObjectId,
  farmer: ObjectId,
  terms: String,
  quantity: Number,
  price: Number,
  deliveryDate: Date,
  status: ["Pending", "Accepted", "Rejected", "Completed"],
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use ES6+ features
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Include unit tests for new features

## 📌 Development Notes

- This project follows RESTful API conventions
- Database schema is designed for scalability
- Real-time features use Socket.IO for instant updates
- File uploads are handled via Cloudinary
- Authentication uses JWT tokens with refresh mechanism
- Frontend uses responsive design principles
- All forms include client-side and server-side validation

## 🔧 Troubleshooting

**Common Issues:**

- **MongoDB connection errors:** Ensure MongoDB is running and connection string is correct
- **Port conflicts:** Check if ports 3000/5000 are available, change in environment variables if needed
- **Environment variables:** Verify all required env vars are set in both client and server
- **CORS errors:** Ensure client URL is whitelisted in server CORS configuration
- **JWT token errors:** Check token expiry and refresh mechanism

**Debug Commands:**

```bash
# Check MongoDB status
mongod --version

# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reset node_modules
rm -rf node_modules package-lock.json && npm install
```

## 🛣️ Roadmap

- **Phase 1:** Basic CRUD operations and authentication ✅
- **Phase 2:** Contract management and payment integration 🔄
- **Phase 3:** Real-time features and notifications 📋
- **Phase 4:** Mobile app development 📋
- **Phase 5:** Advanced analytics and reporting 📋
- **Phase 6:** Multi-language support and internationalization 📋

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Production Build

```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📄 License

MIT License © 2025 FarmEasy Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 📞 Support

For questions or support, please contact:

- **Email:** support@farmeasy.com
- **GitHub Issues:** [Create an issue](https://github.com/yassshhhh22/Contract-Farming/issues)
- **Documentation:** [Wiki](https://github.com/yassshhhh22/Contract-Farming/wiki)
- **Discord:** [Join our community](https://discord.gg/farmeasy)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the agricultural community for their insights
- Built with ❤️ for farmers and buyers worldwide

---

**Note:** This project is actively under development. Features and documentation will be updated regularly. Star ⭐ the repository to stay updated!

**Version:** 1.0.0-beta  
**Last Updated:** January 2025

- **GitHub Issues:** [Create an issue](https://github.com/yassshhhh22/Contract-Farming/issues)
- **Documentation:** [Wiki](https://github.com/yassshhhh22/Contract-Farming/wiki)
- **Discord:** [Join our community](https://discord.gg/farmeasy)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the agricultural community for their insights
- Built with ❤️ for farmers and buyers worldwide

---

**Note:** This project is actively under development. Features and documentation will be updated regularly. Star ⭐ the repository to stay updated!

**Version:** 1.0.0-beta  
**Last Updated:** January 2025
