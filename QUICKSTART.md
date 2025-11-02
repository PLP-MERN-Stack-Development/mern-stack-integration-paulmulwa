# 🚀 Quick Start Guide - MERN Blog Application

## Prerequisites Check
✅ Node.js v18+ installed  
✅ MongoDB installed and running  
✅ Terminal/PowerShell access  

## Installation Steps

### Step 1: Install Dependencies

Open PowerShell and navigate to the project:

```powershell
cd "c:\Users\Administrator\Desktop\projects\Week 4 Assignment"
```

Install server dependencies:
```powershell
cd server
npm install
```

Install client dependencies:
```powershell
cd ..\client
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is running:
```powershell
net start MongoDB
```

Or if you need to start it manually:
```powershell
mongod
```

### Step 3: Start the Application

Open **TWO** PowerShell terminals:

**Terminal 1 (Backend):**
```powershell
cd "c:\Users\Administrator\Desktop\projects\Week 4 Assignment\server"
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

**Terminal 2 (Frontend):**
```powershell
cd "c:\Users\Administrator\Desktop\projects\Week 4 Assignment\client"
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### Step 4: Access the Application

Open your browser and go to: **http://localhost:5173**

## First-Time Setup

### 1. Create an Account
- Click "Sign Up" in the navbar
- Enter your details:
  - Name: Test User
  - Email: test@example.com
  - Password: password123
- Click "Sign Up"

### 2. Create Sample Categories

You'll need some categories before creating posts. Use an API client (Postman, Thunder Client) or run this script:

Create a file `seed-categories.js` in the server folder:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './src/models/Category.js';

dotenv.config();

const categories = [
  { name: 'Technology', description: 'All about tech and innovation' },
  { name: 'Lifestyle', description: 'Life, wellness, and personal growth' },
  { name: 'Travel', description: 'Travel guides and experiences' },
  { name: 'Food', description: 'Recipes and food reviews' },
  { name: 'Business', description: 'Business and entrepreneurship' }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    
    await Category.deleteMany({});
    const created = await Category.insertMany(categories);
    
    console.log(`${created.length} categories created`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCategories();
```

Run it:
```powershell
cd server
node seed-categories.js
```

### 3. Create Your First Post
- Click "Create Post" in the navbar
- Fill in:
  - Title: "Welcome to My Blog"
  - Content: Write some content using the rich text editor
  - Category: Select "Technology"
  - Tags: javascript, react, nodejs
  - Featured Image: Upload an image (optional)
- Click "Create Post"

### 4. Test Features
- ✅ Browse posts on home page
- ✅ Click a post to view details
- ✅ Add a comment
- ✅ Search for posts
- ✅ Filter by category
- ✅ Edit your post
- ✅ Upload an image

## Common Issues & Solutions

### Issue: MongoDB not connecting
**Solution:**
```powershell
# Check if MongoDB is running
tasklist | findstr mongod

# If not, start it
net start MongoDB
```

### Issue: Port 5000 already in use
**Solution:**
```powershell
# Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "Cannot find module" errors
**Solution:**
```powershell
# Reinstall dependencies
cd server
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

cd ..\client
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Issue: CORS errors
**Solution:** Check that:
- Server is running on port 5000
- Client is running on port 5173
- `.env` file has `CLIENT_URL=http://localhost:5173`

## API Testing with Postman

Import these endpoints:

**Register User:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Category (requires auth token):**
```
POST http://localhost:5000/api/categories
Headers:
  Authorization: Bearer <your-token>
Body (JSON):
{
  "name": "Technology",
  "description": "Tech posts"
}
```

## Project Structure Quick Reference

```
server/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, validation, errors
│   └── server.js        # App entry point

client/
├── src/
│   ├── pages/          # Page components
│   ├── components/     # Reusable components
│   ├── services/       # API calls
│   ├── context/        # Global state
│   └── hooks/          # Custom hooks
```

## Next Steps

1. ✅ Explore the codebase
2. ✅ Create multiple posts
3. ✅ Test all features
4. ✅ Try editing and deleting
5. ✅ Add comments
6. ✅ Upload images
7. ✅ Test search and filters

## Support

If you encounter any issues:
1. Check the console for errors (both browser and terminal)
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check that both servers are running
5. Clear browser cache if needed

## Congratulations! 🎉

Your MERN stack blog application is now running! Start creating amazing content!
