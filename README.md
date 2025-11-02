<<<<<<< HEAD
# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 
=======
# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This application demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.

## 🚀 Features

### Core Features
- **User Authentication**: Secure registration and login with JWT
- **Blog Post Management**: Create, read, update, and delete posts
- **Rich Text Editor**: Create posts with formatted content using React Quill
- **Category System**: Organize posts by categories
- **Comments**: Add and delete comments on posts
- **Image Uploads**: Upload featured images for blog posts
- **Search & Filtering**: Search posts and filter by category
- **Pagination**: Navigate through posts efficiently
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Features
- **Protected Routes**: Authentication-based route protection
- **Optimistic UI Updates**: Immediate feedback for user actions
- **Error Handling**: Comprehensive error handling throughout the app
- **Input Validation**: Server and client-side validation
- **View Counter**: Track post view counts
- **Tags System**: Organize posts with tags
- **Draft/Published Status**: Control post visibility

## 📁 Project Structure

```
Week 4 Assignment/
├── server/                 # Backend server
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # Mongoose models
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Server entry point
│   ├── uploads/           # Uploaded images
│   ├── package.json
│   └── .env              # Environment variables
│
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Node.js & Express.js**: Server and API
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Multer**: File uploads
- **express-validator**: Input validation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **React Quill**: Rich text editor
- **React Icons**: Icon library
- **React Toastify**: Notifications
- **date-fns**: Date formatting
- **Vite**: Build tool

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project

```powershell
cd "c:\Users\Administrator\Desktop\projects\Week 4 Assignment"
```

### 2. Install Server Dependencies

```powershell
cd server
npm install
```

### 3. Install Client Dependencies

```powershell
cd ..\client
npm install
```

### 4. Set Up Environment Variables

The server already has a `.env` file configured. If you need to modify it:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=mern-blog-secret-key-2025
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```powershell
# If MongoDB is installed as a service
net start MongoDB

# Or start manually
mongod
```

### 6. Start the Development Servers

**Terminal 1 - Start Backend Server:**

```powershell
cd server
npm run dev
```

The server will start on `http://localhost:5000`

**Terminal 2 - Start Frontend Server:**

```powershell
cd client
npm run dev
```

The client will start on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Comments
- `POST /api/posts/:id/comments` - Add comment (protected)
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment (protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Upload
- `POST /api/upload` - Upload image (protected)

## 🎯 Usage Guide

### Creating Your First Post

1. **Register an Account**
   - Click "Sign Up" in the navbar
   - Fill in your name, email, and password
   - Submit the form

2. **Create Categories (Optional)**
   - You can create categories via the API or use the default ones
   - Categories help organize your posts

3. **Create a Post**
   - Click "Create Post" in the navbar
   - Fill in the title, content, category
   - Optionally add tags and featured image
   - Click "Create Post"

4. **View and Interact**
   - Browse posts on the home page
   - Click on a post to view details
   - Add comments to posts
   - Edit or delete your own posts

### Adding Sample Categories

You can use an API client like Postman or create categories programmatically:

```javascript
// Sample categories
const categories = [
  { name: "Technology", description: "Tech-related posts" },
  { name: "Lifestyle", description: "Lifestyle and wellness" },
  { name: "Travel", description: "Travel experiences" },
  { name: "Food", description: "Recipes and food reviews" },
  { name: "Business", description: "Business and entrepreneurship" }
];
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Input validation and sanitization
- Rate limiting on API endpoints
- Helmet for security headers
- CORS configuration
- File upload restrictions

## 🎨 Key Features Demonstration

### State Management
- Uses React Context API for global auth state
- Custom `useApi` hook for data fetching
- Local state management with useState

### Optimistic Updates
- Immediate UI feedback when adding comments
- Loading states for better UX

### Error Handling
- Try-catch blocks in all async operations
- User-friendly error messages
- Toast notifications for feedback

### Form Validation
- Client-side validation for instant feedback
- Server-side validation for security
- Clear error messages

## 🐛 Troubleshooting

### MongoDB Connection Issues
```powershell
# Check if MongoDB is running
tasklist | findstr mongod

# Start MongoDB service
net start MongoDB
```

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Module Not Found
```powershell
# Reinstall dependencies
cd server
Remove-Item -Recurse -Force node_modules
npm install

cd ..\client
Remove-Item -Recurse -Force node_modules
npm install
```

## 📝 Testing the Application

### Test User Registration
1. Go to `http://localhost:5173/register`
2. Create a test account
3. You'll be automatically logged in

### Test Post Creation
1. Click "Create Post"
2. Fill in the form
3. Upload an image (optional)
4. Submit

### Test Search & Filter
1. Go to home page
2. Use the search bar
3. Filter by category
4. Navigate through pages

## 🚀 Deployment Considerations

### Backend Deployment
- Set environment variables in production
- Use a production MongoDB instance (MongoDB Atlas)
- Configure CORS for production client URL
- Set `NODE_ENV=production`

### Frontend Deployment
- Update API URLs for production
- Build the React app: `npm run build`
- Deploy the `dist` folder

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Week 4 Assignment - MERN Stack Integration

## 🙏 Acknowledgments

- MongoDB documentation
- Express.js documentation
- React documentation
- Node.js community
>>>>>>> 60d1a7e (Add project files)
