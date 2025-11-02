import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './src/models/Category.js';
import User from './src/models/User.js';
import Post from './src/models/Post.js';

dotenv.config();

const categories = [
  { name: 'Technology', description: 'All about tech and innovation' },
  { name: 'Lifestyle', description: 'Life, wellness, and personal growth' },
  { name: 'Travel', description: 'Travel guides and experiences' },
  { name: 'Food', description: 'Recipes and food reviews' },
  { name: 'Business', description: 'Business and entrepreneurship' }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');
    
    // Clear existing data
    console.log('\nClearing existing data...');
    await Category.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('✓ Existing data cleared');
    
    // Drop indexes to avoid conflicts
    try {
      await Category.collection.dropIndexes();
    } catch (err) {
      // Index might not exist, ignore error
    }
    
    // Create categories one by one
    console.log('\nCreating categories...');
    const createdCategories = [];
    for (const cat of categories) {
      const category = await Category.create(cat);
      createdCategories.push(category);
    }
    console.log(`✓ ${createdCategories.length} categories created`);
    
    // Create sample users
    console.log('\nCreating sample users...');
    const users = [
      {
        name: 'Mike Kamau',
        email: 'mike.kamau@example.com',
        password: 'password123'
      },
      {
        name: 'Paul Munyaka',
        email: 'paul.munyaka@example.com',
        password: 'password123'
      },
      {
        name: 'Grace Wanjiku',
        email: 'grace.wanjiku@example.com',
        password: 'password123'
      }
    ];
    
    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`✓ ${createdUsers.length} sample users created`);
    console.log('  Login credentials:');
    console.log('  - mike.kamau@example.com / password123');
    console.log('  - paul.munyaka@example.com / password123');
    console.log('  - grace.wanjiku@example.com / password123');
    
    // Create sample posts
    console.log('\nCreating sample posts...');
    const samplePosts = [
      {
        title: 'Getting Started with MERN Stack Development',
        content: '<h2>Introduction to MERN Stack</h2><p>The MERN stack is a powerful combination of MongoDB, Express.js, React.js, and Node.js. It allows developers to build full-stack applications using JavaScript throughout the entire development process.</p><h3>Why Choose MERN?</h3><p>MERN provides a complete framework for building modern web applications with a seamless development experience. All four technologies use JavaScript, which means you can use the same language on both the frontend and backend.</p><h3>Getting Started</h3><p>To start building with MERN, you need to understand each component. MongoDB handles your database, Express.js manages your backend routing, React.js builds your user interface, and Node.js runs your server-side code.</p>',
        excerpt: 'Learn the fundamentals of MERN stack development and build amazing full-stack applications using JavaScript.',
        author: createdUsers[0]._id,
        category: createdCategories[0]._id,
        tags: ['javascript', 'react', 'nodejs', 'mongodb', 'fullstack'],
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'React Hooks: A Complete Guide for Modern Development',
        content: '<h2>Understanding React Hooks</h2><p>React Hooks revolutionized the way we write React components. They allow you to use state and other React features without writing class components.</p><h3>The Most Important Hooks</h3><p><strong>useState</strong> - Manages component state<br/><strong>useEffect</strong> - Handles side effects<br/><strong>useContext</strong> - Accesses context values<br/><strong>useCallback</strong> - Memoizes functions<br/><strong>useMemo</strong> - Memoizes values</p><h3>Best Practices</h3><p>Always call hooks at the top level of your component, never inside conditions or loops. Create custom hooks to reuse stateful logic across components.</p>',
        excerpt: 'Master React Hooks and write cleaner, more efficient React components with this comprehensive guide.',
        author: createdUsers[1]._id,
        category: createdCategories[0]._id,
        tags: ['react', 'hooks', 'javascript', 'frontend', 'web development'],
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'Node.js Performance Optimization Tips',
        content: '<h2>Optimize Your Node.js Applications</h2><p>Node.js is known for its performance, but there are many ways to make your applications even faster and more efficient.</p><h3>Key Optimization Techniques</h3><p>1. <strong>Use Async/Await</strong> - Handle asynchronous operations cleanly<br/>2. <strong>Implement Caching</strong> - Reduce database queries with Redis or in-memory caching<br/>3. <strong>Use Compression</strong> - Compress responses with gzip<br/>4. <strong>Database Indexing</strong> - Speed up queries with proper indexes<br/>5. <strong>Load Balancing</strong> - Distribute traffic across multiple instances</p><h3>Monitoring</h3><p>Use tools like PM2, New Relic, or DataDog to monitor your application performance in production.</p>',
        excerpt: 'Discover essential techniques to optimize your Node.js applications for better performance and scalability.',
        author: createdUsers[2]._id,
        category: createdCategories[0]._id,
        tags: ['nodejs', 'performance', 'optimization', 'backend'],
        featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'MongoDB Best Practices for Scalable Applications',
        content: '<h2>Building Scalable MongoDB Databases</h2><p>MongoDB is a powerful NoSQL database, but you need to follow best practices to ensure your application scales efficiently.</p><h3>Schema Design</h3><p>Design your schemas based on how you query your data, not how you store it. Use embedded documents for one-to-few relationships and references for one-to-many relationships.</p><h3>Indexing Strategy</h3><p>Create indexes on fields you frequently query. Use compound indexes for queries that filter on multiple fields. Monitor index usage with explain() to ensure they are being used effectively.</p><h3>Connection Pooling</h3><p>Use connection pooling to manage database connections efficiently. This reduces overhead and improves performance.</p>',
        excerpt: 'Learn MongoDB best practices to build scalable, high-performance database solutions for your applications.',
        author: createdUsers[0]._id,
        category: createdCategories[0]._id,
        tags: ['mongodb', 'database', 'nosql', 'scaling', 'backend'],
        featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'Building RESTful APIs with Express.js',
        content: '<h2>Create Professional REST APIs</h2><p>Express.js is the most popular Node.js framework for building web applications and APIs. Learn how to create robust, scalable RESTful APIs.</p><h3>REST Principles</h3><p>Follow REST conventions: use proper HTTP methods (GET, POST, PUT, DELETE), implement proper status codes, and design clean, intuitive endpoints.</p><h3>Middleware</h3><p>Use middleware for authentication, validation, error handling, and logging. Express middleware is powerful and makes your code modular and reusable.</p><h3>Security</h3><p>Implement helmet for security headers, rate limiting to prevent abuse, and proper authentication with JWT tokens.</p>',
        excerpt: 'Master Express.js and build production-ready RESTful APIs with proper architecture and security.',
        author: createdUsers[1]._id,
        category: createdCategories[0]._id,
        tags: ['expressjs', 'api', 'rest', 'nodejs', 'backend'],
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'Modern JavaScript ES6+ Features You Should Know',
        content: '<h2>Essential Modern JavaScript</h2><p>JavaScript has evolved significantly with ES6 and beyond. These features make your code cleaner, more readable, and more efficient.</p><h3>Must-Know Features</h3><p><strong>Arrow Functions</strong> - Concise function syntax<br/><strong>Destructuring</strong> - Extract values from objects and arrays<br/><strong>Spread Operator</strong> - Expand iterables<br/><strong>Template Literals</strong> - String interpolation<br/><strong>Promises & Async/Await</strong> - Handle asynchronous operations<br/><strong>Modules</strong> - Import and export functionality</p><h3>Practical Usage</h3><p>Use these features in your daily coding to write more maintainable and professional JavaScript code.</p>',
        excerpt: 'Explore essential modern JavaScript features that every developer should master for writing better code.',
        author: createdUsers[2]._id,
        category: createdCategories[0]._id,
        tags: ['javascript', 'es6', 'web development', 'programming'],
        featuredImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'Git Version Control: Best Practices for Teams',
        content: '<h2>Mastering Git for Team Collaboration</h2><p>Git is essential for modern software development. Learn best practices for using Git effectively in team environments.</p><h3>Branching Strategy</h3><p>Use Git Flow or GitHub Flow for managing branches. Keep main branch production-ready, create feature branches for new work, and use pull requests for code review.</p><h3>Commit Messages</h3><p>Write clear, descriptive commit messages. Follow conventional commits format: feat:, fix:, docs:, style:, refactor:, test:, chore:.</p><h3>Collaboration</h3><p>Use pull requests for code review, rebase to keep history clean, and resolve conflicts carefully. Communicate with your team about major changes.</p>',
        excerpt: 'Learn Git best practices and workflows that will make you a more effective team developer.',
        author: createdUsers[0]._id,
        category: createdCategories[0]._id,
        tags: ['git', 'version control', 'collaboration', 'development'],
        featuredImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Which',
        content: '<h2>Choosing the Right Layout System</h2><p>Both CSS Grid and Flexbox are powerful layout systems, but they excel at different things. Learn when to use each one.</p><h3>Flexbox</h3><p>Use Flexbox for one-dimensional layouts (rows or columns). Perfect for navigation bars, card layouts, and centering content. Flexbox is content-first.</p><h3>CSS Grid</h3><p>Use CSS Grid for two-dimensional layouts (rows and columns together). Ideal for page layouts, complex designs, and when you need precise control. Grid is layout-first.</p><h3>Combining Both</h3><p>You can use both together! Use Grid for the overall page layout and Flexbox for component internals.</p>',
        excerpt: 'Understand the differences between CSS Grid and Flexbox and learn when to use each for optimal layouts.',
        author: createdUsers[1]._id,
        category: createdCategories[0]._id,
        tags: ['css', 'flexbox', 'grid', 'web design', 'frontend'],
        featuredImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'TypeScript: Why You Should Use It in Your Next Project',
        content: '<h2>The Case for TypeScript</h2><p>TypeScript adds static typing to JavaScript, catching errors before runtime and improving developer experience.</p><h3>Key Benefits</h3><p><strong>Type Safety</strong> - Catch errors at compile time<br/><strong>Better IDE Support</strong> - Excellent autocomplete and refactoring<br/><strong>Self-Documenting</strong> - Types serve as inline documentation<br/><strong>Scalability</strong> - Easier to maintain large codebases</p><h3>Getting Started</h3><p>Start with basic type annotations, gradually add interfaces and types, and use strict mode for maximum safety. The learning curve is worth it!</p>',
        excerpt: 'Discover why TypeScript is becoming the standard for modern JavaScript development and how it improves code quality.',
        author: createdUsers[2]._id,
        category: createdCategories[0]._id,
        tags: ['typescript', 'javascript', 'web development', 'programming'],
        featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
        status: 'published'
      },
      {
        title: 'Docker for Developers: Containerize Your Applications',
        content: '<h2>Introduction to Docker</h2><p>Docker revolutionizes how we deploy applications by packaging them with all dependencies into containers that run consistently anywhere.</p><h3>Core Concepts</h3><p><strong>Images</strong> - Read-only templates for containers<br/><strong>Containers</strong> - Running instances of images<br/><strong>Dockerfile</strong> - Instructions to build images<br/><strong>Docker Compose</strong> - Manage multi-container applications</p><h3>Benefits</h3><p>Consistent environments across development, testing, and production. Easy deployment, scaling, and isolation. Industry standard for modern deployment.</p>',
        excerpt: 'Learn how Docker containers can simplify your development workflow and deployment process.',
        author: createdUsers[0]._id,
        category: createdCategories[0]._id,
        tags: ['docker', 'containers', 'devops', 'deployment'],
        featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
        status: 'published'
      }
    ];
    
    // Create posts one by one
    const createdPosts = [];
    for (const postData of samplePosts) {
      const post = await Post.create(postData);
      createdPosts.push(post);
    }
    console.log(`✓ ${createdPosts.length} sample posts created`);
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Login with: john@example.com / password123');
    console.log('3. Create your own posts and categories');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
