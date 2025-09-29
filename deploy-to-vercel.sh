#!/bin/bash

# Automated Vercel Deployment Script for Chai-Fi
# Run this script to deploy your app to Vercel

echo "🚀 Starting automated Vercel deployment for Chai-Fi..."

# Install Vercel CLI if not already installed
echo "📦 Installing Vercel CLI..."
npm install -g vercel

# Login to Vercel using your token
echo "🔐 Authenticating with Vercel..."
echo "RZmYn1erjaryN0q0F7GRH2rW" | vercel login

# Deploy the project
echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment completed! Check your Vercel dashboard for the live URL."
echo "🌐 Your Chai-Fi app should be live at: https://chaifi-[random-string].vercel.app"