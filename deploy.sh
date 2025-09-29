#!/bin/bash

# Automated Vercel Deployment Script
# Requires: Node.js, npm, and Vercel CLI

echo "Installing Vercel CLI globally..."
npm install -g vercel

echo "Logging in to Vercel (you may need to authenticate in browser)..."
vercel login

echo "Linking project to Vercel..."
vercel link

echo "Deploying to production..."
vercel --prod

echo "Deployment complete! Check your Vercel dashboard for the URL."