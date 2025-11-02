# MERN Blog Application - Installation Script
# This script will help you set up the project quickly

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  MERN Blog Application - Installation Script   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if MongoDB is installed
Write-Host "Checking MongoDB installation..." -ForegroundColor Yellow
try {
    $mongoVersion = mongod --version
    Write-Host "✓ MongoDB is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ MongoDB is not installed!" -ForegroundColor Red
    Write-Host "Please install MongoDB from https://www.mongodb.com/try/download/community" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Installing Dependencies..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
Set-Location -Path "server"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Server dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install server dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install client dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Yellow
Set-Location -Path "..\client"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Client dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install client dependencies" -ForegroundColor Red
    exit 1
}

Set-Location -Path ".."

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Starting MongoDB..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Try to start MongoDB
try {
    net start MongoDB 2>$null
    Write-Host "✓ MongoDB started successfully" -ForegroundColor Green
} catch {
    Write-Host "! MongoDB might already be running or needs manual start" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Seeding Database (Optional)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$seed = Read-Host "Do you want to seed the database with sample data? (Y/N)"
if ($seed -eq 'Y' -or $seed -eq 'y') {
    Write-Host "Seeding database..." -ForegroundColor Yellow
    Set-Location -Path "server"
    node seed.js
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database seeded successfully" -ForegroundColor Green
    } else {
        Write-Host "! Seeding failed - you can run 'node seed.js' later" -ForegroundColor Yellow
    }
    Set-Location -Path ".."
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "  Installation Complete! 🎉                      " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open TWO PowerShell terminals" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 - Start Backend Server:" -ForegroundColor Yellow
Write-Host "   cd server" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Start Frontend Server:" -ForegroundColor Yellow
Write-Host "   cd client" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Open browser: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

if ($seed -eq 'Y' -or $seed -eq 'y') {
    Write-Host "Sample Login Credentials:" -ForegroundColor Green
    Write-Host "   Email: john@example.com" -ForegroundColor White
    Write-Host "   Password: password123" -ForegroundColor White
    Write-Host ""
}

Write-Host "For more information, see README.md and QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
Write-Host ""
