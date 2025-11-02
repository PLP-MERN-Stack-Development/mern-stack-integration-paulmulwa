# 📁 Project Structure

## Complete File Structure

```
Week 4 Assignment/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick setup guide
├── 📄 TESTING.md                   # Testing guide
├── 📄 PROJECT-SUMMARY.md           # Project summary
├── 📄 .gitignore                   # Git ignore rules
├── 📄 install.ps1                  # Installation script
│
├── 📂 server/                      # Backend application
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── db.js              # MongoDB connection
│   │   │
│   │   ├── 📂 models/
│   │   │   ├── Category.js        # Category schema
│   │   │   ├── Post.js            # Post schema (with comments)
│   │   │   └── User.js            # User schema
│   │   │
│   │   ├── 📂 controllers/
│   │   │   ├── authController.js  # Auth logic
│   │   │   ├── categoryController.js
│   │   │   └── postController.js  # Post & comment logic
│   │   │
│   │   ├── 📂 routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   ├── categoryRoutes.js  # Category endpoints
│   │   │   ├── postRoutes.js      # Post endpoints
│   │   │   └── uploadRoutes.js    # Upload endpoint
│   │   │
│   │   ├── 📂 middleware/
│   │   │   ├── auth.js            # JWT authentication
│   │   │   ├── errorHandler.js   # Error handling
│   │   │   └── validation.js     # Input validation
│   │   │
│   │   ├── 📂 utils/
│   │   │   └── helpers.js         # Helper functions
│   │   │
│   │   └── server.js              # Express app entry
│   │
│   ├── 📂 uploads/
│   │   └── .gitkeep               # Keep folder in git
│   │
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 seed.js                  # Database seeding
│   ├── 📄 .env                     # Environment variables
│   ├── 📄 .env.example             # Environment template
│   └── 📄 .gitignore               # Git ignore
│
└── 📂 client/                      # Frontend application
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── ErrorMessage.jsx   # Error display
    │   │   ├── Loading.jsx        # Loading spinner
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   ├── Navbar.css
    │   │   ├── Pagination.jsx     # Page navigation
    │   │   ├── PostCard.jsx       # Post preview card
    │   │   ├── PostCard.css
    │   │   ├── PrivateRoute.jsx   # Route protection
    │   │   └── SearchBar.jsx      # Search component
    │   │
    │   ├── 📂 pages/
    │   │   ├── Home.jsx           # Post list page
    │   │   ├── Home.css
    │   │   ├── PostDetail.jsx     # Single post page
    │   │   ├── PostDetail.css
    │   │   ├── PostForm.jsx       # Create/edit form
    │   │   ├── PostForm.css
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   └── Auth.css           # Auth styles
    │   │
    │   ├── 📂 context/
    │   │   └── AuthContext.jsx    # Auth state
    │   │
    │   ├── 📂 hooks/
    │   │   ├── useApi.js          # API call hook
    │   │   └── useAuth.js         # Auth hook
    │   │
    │   ├── 📂 services/
    │   │   ├── api.js             # Axios instance
    │   │   ├── authService.js     # Auth API calls
    │   │   ├── categoryService.js # Category API calls
    │   │   ├── postService.js     # Post API calls
    │   │   └── uploadService.js   # Upload API calls
    │   │
    │   ├── App.jsx                 # Root component
    │   ├── App.css                 # App styles
    │   ├── main.jsx                # App entry
    │   └── index.css               # Global styles
    │
    ├── 📄 index.html               # HTML template
    ├── 📄 package.json             # Dependencies
    ├── 📄 vite.config.js           # Vite config
    └── 📄 .gitignore               # Git ignore
```

## File Count Summary

### Backend
- **Configuration**: 1 file
- **Models**: 3 files (User, Post, Category)
- **Controllers**: 3 files
- **Routes**: 4 files
- **Middleware**: 3 files
- **Utils**: 1 file
- **Total Backend Files**: 16 files

### Frontend
- **Components**: 8 files (7 JSX + CSS)
- **Pages**: 8 files (5 JSX + 3 CSS)
- **Context**: 1 file
- **Hooks**: 2 files
- **Services**: 5 files
- **App Files**: 3 files (App.jsx, main.jsx, index.css)
- **Total Frontend Files**: 27 files

### Documentation
- README.md
- QUICKSTART.md
- TESTING.md
- PROJECT-SUMMARY.md
- **Total Documentation**: 4 files

### Configuration
- package.json (x2)
- vite.config.js
- .env files (x2)
- .gitignore (x3)
- install.ps1
- seed.js
- **Total Config**: 11 files

## Total Project Files: 58+ files

## Key Directories

### `/server/src/models`
Contains Mongoose schemas that define the structure of your database collections.

### `/server/src/controllers`
Contains business logic for handling requests. Each controller corresponds to a resource.

### `/server/src/routes`
Defines API endpoints and maps them to controller functions.

### `/server/src/middleware`
Contains reusable middleware for authentication, validation, and error handling.

### `/client/src/components`
Reusable React components used across multiple pages.

### `/client/src/pages`
Page-level components that represent different routes in the application.

### `/client/src/services`
API service layer that handles all HTTP requests to the backend.

### `/client/src/context`
React Context for global state management (authentication).

## Code Organization Principles

1. **Separation of Concerns**: Each file has a single responsibility
2. **Modularity**: Code is organized into reusable modules
3. **Scalability**: Structure supports easy addition of new features
4. **Maintainability**: Clear naming and organization
5. **Best Practices**: Follows industry-standard patterns

## Import Patterns

### Backend (ES Modules)
```javascript
import express from 'express';
import { getPosts } from '../controllers/postController.js';
```

### Frontend (ES Modules)
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
```

## Naming Conventions

- **Files**: camelCase.js or PascalCase.jsx
- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_CASE
- **Routes**: kebab-case

## Environment Variables

**Server (.env):**
- PORT
- NODE_ENV
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRE
- CLIENT_URL

**Client:**
- Uses Vite's default environment variable handling
- Proxy configured in vite.config.js

## Database Collections

1. **users** - User accounts
2. **posts** - Blog posts (includes embedded comments)
3. **categories** - Post categories

## API Routes Pattern

```
/api/auth/*        - Authentication routes
/api/posts/*       - Post routes
/api/categories/*  - Category routes
/api/upload/*      - File upload routes
```

## Component Hierarchy

```
App
├── Navbar
└── Routes
    ├── Home
    │   ├── SearchBar
    │   ├── PostCard (multiple)
    │   └── Pagination
    ├── PostDetail
    │   └── Comments
    ├── PostForm
    ├── Login
    └── Register
```

## State Management

- **Global State**: AuthContext (user authentication)
- **Local State**: useState in components
- **Server State**: API calls with useApi hook
- **Form State**: Controlled components

## Styling Approach

- **CSS Modules**: Separate CSS files for components
- **Global Styles**: index.css for common styles
- **CSS Variables**: Defined in :root
- **Responsive**: Mobile-first approach

This structure ensures maintainability, scalability, and follows React and Node.js best practices!
