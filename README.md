# Zerodha Clone - Full Stack Trading Platform

A comprehensive full-stack trading platform clone with modern features, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Dashboard**: Real-time portfolio tracking and management
- **Order Management**: Place and track buy/sell orders
- **Holdings & Positions**: View your portfolio holdings and open positions
- **Watchlist**: Real-time stock price updates

### Modern Enhancements
- ✅ **Dark/Light Mode**: Toggle between themes with smooth transitions
- ✅ **Real-time Updates**: Live market indices and stock price updates
- ✅ **AI Portfolio Insights**: Intelligent suggestions for portfolio optimization
- ✅ **Notifications**: Real-time alerts for significant stock movements
- ✅ **Interactive Charts**: Enhanced portfolio performance visualization
- ✅ **Responsive Design**: Fully optimized for mobile and desktop
- ✅ **Modern UI**: Clean, professional design with smooth animations

## 📁 Project Structure

```
zerodhaclone/
├── frontend/          # Landing page (React)
├── dashboard/         # Trading dashboard (React)
├── backend/           # API server (Node.js/Express)
└── README.md
```

## 🛠️ Tech Stack

### Frontend & Dashboard
- React 19
- React Router DOM
- Material-UI Icons
- Chart.js / React-Chartjs-2
- Axios

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zerodhaclone
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Dashboard Setup**
   ```bash
   cd dashboard
   npm install
   ```
   
   Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

## 🚀 Running Locally

### Development Mode

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:8000`

2. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```
   Runs on `http://localhost:3000`

3. **Start Dashboard**
   ```bash
   cd dashboard
   npm start
   ```
   Runs on `http://localhost:3001`

## 🌐 Deployment on Vercel

### Backend Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `backend/` directory
3. Run `vercel` and follow prompts
4. Set environment variables in Vercel dashboard:
   - `MONGO_URL`
   - `JWT_SECRET`
5. Update API URLs in frontend/dashboard `.env` files

### Frontend & Dashboard Deployment

1. Navigate to respective directories (`frontend/` or `dashboard/`)
2. Run `vercel` and follow prompts
3. Set environment variable:
   - `REACT_APP_API_URL` (your backend Vercel URL)

### Environment Variables for Vercel

**Backend:**
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (auto-set by Vercel)

**Frontend/Dashboard:**
- `REACT_APP_API_URL` - Backend API URL

## 📝 API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (requires auth)

### Trading
- `GET /allHoldings` - Get all holdings
- `GET /allPositions` - Get all positions
- `GET /orders` - Get all orders
- `POST /newOrder` - Place new order

## 🎨 Features in Detail

### Dark Mode
- Toggle between light and dark themes
- Preferences saved in localStorage
- Smooth transitions across all components

### Real-time Updates
- Market indices update every 5 seconds
- Stock prices update every 3 seconds
- Live notifications for significant movements

### AI Insights
- Portfolio performance analysis
- Diversification recommendations
- Risk assessment alerts
- Market sentiment analysis

### Notifications
- Browser notifications (with permission)
- In-app notification center
- Real-time stock movement alerts

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify `MONGO_URL` in `.env`
   - Check MongoDB service status
   - Ensure network access if using cloud MongoDB

2. **CORS Errors**
   - Verify backend CORS configuration
   - Check API URL in frontend/dashboard `.env`

3. **Authentication Issues**
   - Clear localStorage
   - Verify JWT_SECRET matches
   - Check token expiration

## 🚧 Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] Advanced charting with technical indicators
- [ ] Paper trading mode
- [ ] Social features (watchlists sharing)
- [ ] Mobile app (React Native)
- [ ] Advanced order types (limit, stop-loss)
- [ ] Portfolio analytics dashboard
- [ ] News integration

## 📄 License

This project is for educational purposes.

## 👨‍💻 Development

### Adding New Features

1. Backend: Add routes in `backend/index.js`
2. Frontend: Add components in respective directories
3. Dashboard: Integrate with existing components
4. Update API configuration as needed

### Code Style

- Use ES6+ features
- Follow React best practices
- Maintain consistent naming conventions
- Add comments for complex logic

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Note**: This is a clone project for educational purposes. Not affiliated with Zerodha.


