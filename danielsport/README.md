# DanielSport 🏃‍♂️

A comprehensive sports tracking and management application built with modern web technologies. Track your fitness journey, manage team activities, and analyze performance metrics all in one place.

## 🌟 Features

### 🏃‍♂️ Personal Fitness Tracking
- **Workout Logging**: Track exercises, sets, reps, and weights
- **Progress Monitoring**: Visualize your fitness journey with charts and graphs
- **Goal Setting**: Set and track personal fitness goals
- **Nutrition Tracking**: Log meals and monitor caloric intake
- **Body Metrics**: Track weight, body fat, and other measurements

### ⚽ Team Management
- **Team Creation**: Create and manage sports teams
- **Player Profiles**: Comprehensive player information and statistics
- **Event Scheduling**: Schedule games, practices, and team events
- **Performance Analytics**: Team and individual performance insights
- **Communication Hub**: Team messaging and announcements

### 📊 Analytics & Reporting
- **Performance Dashboards**: Real-time performance metrics
- **Progress Reports**: Detailed progress analysis and trends
- **Export Data**: Export data in various formats (CSV, PDF)
- **Custom Charts**: Interactive charts and visualizations
- **Historical Data**: Long-term performance tracking

### 🎯 Additional Features
- **Social Features**: Connect with friends and share achievements
- **Challenges**: Create and participate in fitness challenges
- **Badges & Achievements**: Gamification elements to stay motivated
- **Mobile Responsive**: Optimized for all devices
- **Offline Support**: Continue tracking even without internet

## 🚀 Live Demo

Visit the live application: [danielsport.vercel.app](https://danielsport.vercel.app)

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Next.js 14** - Full-stack React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **React Query** - Data fetching and caching

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing

### DevOps & Tools
- **Docker** - Containerization
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality
- **Jest** - Testing framework

## 📁 Project Structure

```
danielsport/
├── frontend/                 # Next.js frontend application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles and themes
│   └── types/              # TypeScript type definitions
├── backend/                 # Express.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
├── shared/                  # Shared code between frontend and backend
│   ├── types/              # Shared TypeScript types
│   └── constants/          # Shared constants
├── docs/                   # Documentation
├── tests/                  # Test files
└── docker/                 # Docker configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB 6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Danielomoregie/danielsport.git
   cd danielsport
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_APP_NAME=DanielSport
   
   # Backend (.env)
   MONGODB_URI=mongodb://localhost:27017/danielsport
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend (Terminal 1)
   cd backend
   npm run dev
   
   # Start frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Personal Fitness Tracking

1. **Create Account**: Sign up with email or social login
2. **Set Goals**: Define your fitness objectives
3. **Log Workouts**: Record your exercise sessions
4. **Track Progress**: Monitor your improvement over time
5. **Analyze Data**: Use charts and reports to understand trends

### Team Management

1. **Create Team**: Set up a new sports team
2. **Add Players**: Invite team members
3. **Schedule Events**: Plan games and practices
4. **Track Performance**: Monitor team and individual stats
5. **Communicate**: Use the team messaging system

## 🎨 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Workout Tracking
![Workout Tracking](docs/screenshots/workout-tracking.png)

### Team Management
![Team Management](docs/screenshots/team-management.png)

### Analytics
![Analytics](docs/screenshots/analytics.png)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test

# Run with coverage
npm run test:coverage
```

### Test Coverage
- **Frontend**: 85%+ component coverage
- **Backend**: 90%+ API endpoint coverage
- **Integration**: End-to-end user flows

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build and deploy
npm run build
vercel --prod
```

### Backend (Railway)
```bash
# Deploy to Railway
railway login
railway link
railway up
```

### Docker
```bash
# Build and run with Docker
docker-compose up --build
```

## 📊 Performance Metrics

- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3s

## 🔒 Security Features

- **JWT Authentication**: Secure user sessions
- **Password Hashing**: Bcrypt encryption
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Data Encryption**: Sensitive data protection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests for new functionality**
5. **Ensure all tests pass**
6. **Submit a pull request**

## 📈 Roadmap

### Version 2.0 (Q2 2024)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics with AI insights
- [ ] Social features and community
- [ ] Integration with fitness wearables
- [ ] Video workout tutorials

### Version 3.0 (Q4 2024)
- [ ] Machine learning recommendations
- [ ] Virtual coaching features
- [ ] Multi-language support
- [ ] Advanced team management
- [ ] API for third-party integrations

## 🐛 Known Issues

- [ ] Mobile app performance on older devices
- [ ] Large dataset loading times
- [ ] Offline sync conflicts
- [ ] Chart rendering on Safari

## 📞 Support

- **Email**: omoregiebusiness@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/Danielomoregie/danielsport/issues)
- **Documentation**: [docs.danielsport.com](https://docs.danielsport.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **MongoDB** - For the database solution
- **Open Source Community** - For inspiration and tools
- **University of Houston** - For academic support

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Danielomoregie/danielsport?style=social)
![GitHub forks](https://img.shields.io/github/forks/Danielomoregie/danielsport?style=social)
![GitHub issues](https://img.shields.io/github/issues/Danielomoregie/danielsport)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Danielomoregie/danielsport)
![GitHub last commit](https://img.shields.io/github/last-commit/Danielomoregie/danielsport)

---

**"The only bad workout is the one that didn't happen."** - Daniel Omoregie

**Built with ❤️ for athletes, fitness enthusiasts, and sports teams worldwide**
