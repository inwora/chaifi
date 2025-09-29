#!/bin/bash

# Environment Variables Setup for Vercel
# This script sets up the required environment variables for your Chai-Fi app

echo "🔧 Setting up environment variables in Vercel..."

# Set environment variables
vercel env add MONGODB_URI production
vercel env add DATABASE_URL production  
vercel env add SESSION_SECRET production
vercel env add NODE_ENV production

echo "✅ Environment variables setup completed!"
echo "📝 Please enter the following values when prompted:"
echo "MONGODB_URI: mongodb+srv://chaifimdu_db_user:chaifimdu_db_user%402025@chaifi.1dcy7wl.mongodb.net/chai-fi?retryWrites=true&w=majority&appName=Chaifi"
echo "DATABASE_URL: mongodb+srv://chaifimdu_db_user:chaifimdu_db_user%402025@chaifi.1dcy7wl.mongodb.net/chai-fi?retryWrites=true&w=majority&appName=Chaifi"
echo "SESSION_SECRET: your-super-secure-random-string-for-production-use"
echo "NODE_ENV: production"