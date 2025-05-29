# Ventixe Frontend

A modern React-based dashboard application for managing invoices and feedback in a microservices architecture.

## 🌐 Live Demo

**🚀 Deployed Application**: [https://brave-wave-0648c4d10.6.azurestaticapps.net](https://brave-wave-0648c4d10.6.azurestaticapps.net)

## 📋 Overview

Ventixe Frontend is a responsive React application that provides a comprehensive dashboard for:

- **Invoice Management**: Track, create, and manage invoices
- **Feedback System**: Monitor customer feedback and ratings
- **Dashboard Analytics**: Visual insights into business metrics

## 🛠️ Technologies Used

- **React 18** - Modern React with functional components and hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **React DatePicker** - Date selection components
- **CSS3** - Custom styling with CSS variables
- **Vite** - Build tool and development server

## 🏗️ Architecture

The frontend follows a clean architecture pattern:

```
src/
├── assets/
│   └── components/     # Reusable UI components
├── config/
│   └── apiConfig.js    # API endpoints configuration
├── contexts/           # React contexts for state management
├── pages/              # Page components
│   ├── Dashboard/      # Main dashboard
│   ├── Invoices/       # Invoice management
│   └── Feedback/       # Feedback management
└── services/           # API service layer
    ├── api.js          # Axios configuration
    ├── invoiceService.js
    └── feedbackService.js
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Environment Configuration

The application connects to the following Azure microservices:

- **InvoiceService**: `https://invoiceservice-gmafbqd0gjg8abdf.centralus-01.azurewebsites.net`
- **FeedbackService**: `https://feedbackservice-a7cpfabadjd8c2dm.centralus-01.azurewebsites.net`

API endpoints are configured in `src/config/apiConfig.js`.

## 🚀 Deployment

### Azure Static Web Apps

This application is deployed using Azure Static Web Apps with automatic deployment from GitHub.

**Deployment URL**: [https://brave-wave-0648c4d10.6.azurestaticapps.net](https://brave-wave-0648c4d10.6.azurestaticapps.net)

### Build Commands

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

## 🎯 Features

### 📊 Dashboard

- **Key Metrics**: Total invoices, pending invoices, feedback received
- **Revenue Analytics**: Monthly revenue charts
- **Feedback Overview**: Rating distribution and statistics
- **Quick Actions**: Recent invoices and feedback

### 📄 Invoice Management

- View all invoices with filtering and search
- Create, edit, and delete invoices
- Track invoice status (Paid, Pending, Overdue)
- Export and print functionality

### 💬 Feedback System

- Monitor customer feedback and ratings
- View feedback statistics and trends
- Filter feedback by rating, date, and category
- Respond to customer feedback

### 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Consistent color scheme
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Navigation**: Intuitive sidebar navigation

## 🔌 API Integration

The frontend integrates with multiple microservices:

### Invoice Service

```javascript
// Example API calls
invoiceService.getAllInvoices();
invoiceService.createInvoice(invoiceData);
invoiceService.updateInvoice(id, updateData);
```

### Feedback Service

```javascript
// Example API calls
feedbackService.getAllFeedback();
feedbackService.createFeedback(feedbackData);
feedbackService.getFeedbackStats();
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🛡️ Security Features

- **CORS Configuration**: Proper cross-origin resource sharing
- **API Error Handling**: Graceful error handling for API failures
- **Input Validation**: Client-side form validation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Build & Production

```bash
# Create production build
npm run build

# Analyze bundle size
npm run analyze
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team

## 🗂️ Project Structure

```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, components
│   ├── config/            # Configuration files
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── App.jsx            # Main app component
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

Built with ❤️ using React and deployed on Azure Static Web Apps
