# 🌾 FarmEasy - Agricultural Collaboration Platform

FarmEasy is a comprehensive platform designed to connect farmers with buyers, enabling transparent contract-based agricultural transactions. This project facilitates direct collaboration between agricultural producers and consumers, built with modern web technologies.

## 📁 Folder Structure

```
FarmEasy/
├── server/        # Node.js + Express server
├── client/        # React client application
├── mobile/        # React Native mobile app
└── docs/          # Documentation and API specs
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
- Socket.IO (real-time features)

**Mobile (Optional):**

- React Native
- NativeWind
- React Navigation

## 🧪 Features (Planned)

### Core Features

- [x] User authentication (Farmers & Buyers)
- [ ] Contract creation and management
- [ ] Product catalog with pricing
- [ ] Order tracking and fulfillment
- [ ] Payment integration
- [ ] Document management (contracts, certificates)

### Advanced Features

- [ ] Real-time notifications
- [ ] GPS-based farm location tracking
- [ ] Weather integration
- [ ] Crop monitoring dashboard
- [ ] Multi-language support
- [ ] Rating and review system
- [ ] Analytics and reporting

### User Roles

- **Farmers:** Create profiles, list products, manage contracts
- **Buyers:** Browse products, create purchase contracts, track orders
- **Admin:** Platform management, user verification, dispute resolution

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager
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
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### 3. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install

# Mobile (optional)
cd ../mobile
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
npm start

# Mobile (optional)
cd ../mobile
npx react-native run-android
# or
npx react-native run-ios
```

## 📱 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Contracts

- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `POST /api/contracts` - Create new contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract
- `PUT /api/contracts/:id/status` - Update contract status

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/category/:category` - Get products by category

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `PUT /api/orders/:id/status` - Update order status

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: ["farmer", "buyer", "admin"],
  profile: {
    phone: String,
    address: Object,
    farmSize: Number, // for farmers
    crops: [String]   // for farmers
  },
  verified: Boolean,
  createdAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  category: String,
  description: String,
  price: Number,
  unit: String,
  quantity: Number,
  farmer: ObjectId,
  images: [String],
  location: Object,
  harvestDate: Date,
  createdAt: Date
}
```

### Contract Model

```javascript
{
  farmer: ObjectId,
  buyer: ObjectId,
  product: ObjectId,
  quantity: Number,
  pricePerUnit: Number,
  totalAmount: Number,
  deliveryDate: Date,
  status: ["pending", "accepted", "in_progress", "completed", "cancelled"],
  terms: String,
  documents: [String],
  createdAt: Date
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
