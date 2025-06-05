# Ventixe Event Management System - Frontend

**Inlämningsuppgift - Molntjänster och distribuerade system**

A modern React-based event management platform built as a Minimum Viable Product (MVP) using microservices architecture.

## 🌐 Live Demo

**🚀 Deployed Application**: [https://brave-wave-0648c4d10.6.azurestaticapps.net](https://brave-wave-0648c4d10.6.azurestaticapps.net)

## 📋 Project Overview

Ventixe is an event management system built as part of a cloud services and distributed systems assignment. The project demonstrates a complete microservices architecture with a modern React frontend and multiple ASP.NET Core Web API backend services.

### Assignment Requirements Fulfilled

✅ **Frontend Application**: React-based dashboard with MVP functionality for event management  
✅ **Multiple Backend Services**: 4 distributed microservices (EventService, FeedbackService, GalleryService, InvoiceService)  
✅ **Cloud Deployment**: All services deployed on Azure (Static Web Apps + Web Apps)  
✅ **GitHub Organization**: All repositories organized under GitHub organization  
✅ **Public Access**: Fully functional public website  
✅ **Design Consistency**: Follows provided design guidelines with consistent structure and color scheme

## 🎯 MVP Features

The Ventixe platform provides core event management functionality:

### 🏠 Dashboard

- **Event Overview**: Real-time event statistics and metrics
- **Revenue Analytics**: Financial performance tracking
- **Feedback Monitoring**: Customer satisfaction insights
- **Quick Actions**: Easy access to recent activities

### 🎪 Event Management

- Create, view, and manage events
- Event categorization (Music, Fashion, Technology, Food, etc.)
- Event status tracking and analytics
- Comprehensive event details and metadata

### 💬 Feedback System

- Customer feedback collection and analysis
- Rating system (1-5 stars) with category-based feedback
- Anonymous feedback support
- Feedback analytics and reporting
- Real-time feedback monitoring

### 🖼️ Gallery Management

- Event photo and media management
- Image upload and organization
- Gallery categorization and tagging
- Media analytics and insights

### 📄 Invoice & Financial Management

- Invoice creation and management
- Payment status tracking (Draft, Sent, Paid, Overdue, Cancelled)
- Financial reporting and analytics
- Integration with event bookings

## 🛠️ Technologies Used

### Frontend Stack

- **React 18** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for SPA navigation
- **Axios** - HTTP client for microservices communication
- **React Icons** - Comprehensive icon library
- **CSS3** - Custom styling with CSS variables and responsive design
- **React DatePicker** - Date selection components

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git** - Version control
- **Azure Static Web Apps** - Deployment and hosting

## 🏗️ Architecture

The frontend follows modern React patterns and connects to a distributed microservices backend:

```
Ventixe Frontend (React SPA)
├── Event Management Dashboard
├── Feedback Collection Interface
├── Gallery Management System
└── Invoice & Financial Tracking

↕️ HTTP/REST Communication

Microservices Backend (.NET 9)
├── EventService (Event CRUD & Analytics)
├── FeedbackService (Feedback Collection & Analytics)
├── GalleryService (Media Management)
└── InvoiceService (Financial Management)
```

### Frontend Structure

```
src/
├── assets/
│   ├── components/     # Reusable UI components (Header, Sidebar, Footer)
│   └── layouts/        # Layout components (Portal, Center)
├── config/
│   └── apiConfig.js    # Microservices endpoints configuration
├── contexts/           # React contexts for state management
├── pages/              # Feature-specific page components
│   ├── Dashboard/      # Main dashboard and analytics
│   ├── Events/         # Event management interface
│   ├── Feedback/       # Feedback collection and viewing
│   ├── Gallery/        # Media management interface
│   └── Invoices/       # Financial management
└── services/           # API service layer for microservices
    ├── api.js          # Axios configuration and interceptors
    ├── eventService.js
    ├── feedbackService.js
    ├── galleryService.js
    └── invoiceService.js
```

## 🔌 Microservices Integration

The frontend communicates with multiple backend services deployed on Azure:

### Service Architecture

- **EventService**: `https://eventservice-[hash].azurewebsites.net`
- **FeedbackService**: `https://feedbackservice-[hash].azurewebsites.net`
- **GalleryService**: `https://galleryservice-[hash].azurewebsites.net`
- **InvoiceService**: `https://invoiceservice-[hash].azurewebsites.net`

Each microservice follows clean architecture with:

- **Presentation Layer**: ASP.NET Core Web API controllers
- **Application Layer**: Business logic and services
- **Persistence Layer**: Entity Framework Core with SQL Server

### Communication Patterns

- **REST API**: Primary communication method using HTTP/HTTPS
- **JSON**: Data exchange format
- **CORS**: Properly configured for cross-origin requests
- **Error Handling**: Graceful error handling and user feedback

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Git
- Modern web browser

### Local Development

1. **Clone the repository**

   ```bash
   git clone <frontend-repo-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoints**
   Update `src/config/apiConfig.js` with your microservice URLs

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

### Azure Static Web Apps

The application is deployed using Azure Static Web Apps with:

- **Automatic deployment** from GitHub repository
- **Custom domain** support
- **SSL/HTTPS** enabled by default
- **Global CDN** for fast content delivery

**Live URL**: [https://brave-wave-0648c4d10.6.azurestaticapps.net](https://brave-wave-0648c4d10.6.azurestaticapps.net)

### Build Process

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Lint code
npm run lint
```

## 🎨 Design & UX

The application follows the provided design specifications:

### Design Compliance

✅ **Structure**: Consistent layout and navigation patterns  
✅ **Color Scheme**: Adheres to provided color palette  
✅ **Profiling**: Maintains visual identity requirements  
✅ **Responsive**: Works across desktop, tablet, and mobile devices

### Key UI Features

- **Sidebar Navigation**: Easy access to all system modules
- **Dashboard Widgets**: Real-time data visualization
- **Form Interfaces**: Intuitive data entry for events, feedback, etc.
- **Loading States**: Smooth user experience during API calls
- **Error Handling**: User-friendly error messages and recovery

## 🤖 AI Assistance Acknowledgment

This project was developed with assistance from AI tools for enhanced productivity and code quality:

### Frontend Development

- **v0.dev**: Used for rapid UI component prototyping and design implementation
- **Claude (Anthropic)**: Provided guidance on React best practices and architecture decisions

### Backend Development

- **Claude (Anthropic)**: Served as a mentor for .NET 9 microservices architecture, Entity Framework Core implementation, and clean architecture patterns

The AI assistance was used as a development accelerator and learning tool, while all architectural decisions and implementation details were reviewed and understood by the development team.

## 🧪 Testing & Quality

### Code Quality

- **ESLint**: Enforces coding standards and best practices
- **Component Testing**: Manual testing of all UI components
- **API Integration Testing**: Verified communication with all microservices
- **Responsive Testing**: Tested across multiple device sizes

### Performance

- **Lazy Loading**: Components loaded on demand
- **API Optimization**: Efficient data fetching patterns
- **Bundle Optimization**: Vite-optimized production builds

## 📊 MVP Success Criteria

The delivered MVP successfully demonstrates:

✅ **Functional Event System**: Complete event lifecycle management  
✅ **User Interface**: Intuitive and responsive design  
✅ **Microservices Architecture**: Distributed system with proper separation of concerns  
✅ **Cloud Deployment**: Fully operational in Azure cloud environment  
✅ **Data Management**: Persistent storage and retrieval across all services  
✅ **Real-time Features**: Live data updates and analytics

## 🤝 Development Team

- **Developer**: Kim Hammerstad
- **AI Mentoring**: Claude (Anthropic) for backend architecture
- **UI Assistance**: v0.dev for frontend components

## 📄 Project Context

This project fulfills the requirements for "Inlämningsuppgift - Molntjänster och distribuerade system" by demonstrating:

- **Microservices Architecture**: Multiple independent services
- **Cloud Deployment**: Azure-hosted distributed system
- **Modern Frontend**: React-based single-page application
- **MVP Approach**: Focused feature set with room for expansion
- **Design Compliance**: Adherence to provided design specifications

## 🛡️ Security & Best Practices

- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Client-side and server-side validation
- **Error Handling**: Graceful degradation and user feedback
- **Security Headers**: Implemented in Azure Static Web Apps
- **HTTPS**: Enforced across all communications

## 📈 Future Enhancements

The MVP foundation allows for future expansion:

- User authentication and authorization
- Real-time notifications
- Advanced analytics and reporting
- Mobile application development
- Third-party integrations (payment, messaging)
- Advanced event management features

---

**Built with ❤️ as part of cloud services and distributed systems coursework**  
**Deployed on Microsoft Azure | Developed with React & .NET 9**
