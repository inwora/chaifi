# Production Deployment Guide for Chai-Fi

## Database Setup for Production

The application supports MongoDB Atlas for production with automatic fallback to in-memory storage.

### Required Environment Variables

Add these environment variables in your Vercel dashboard or hosting platform:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chai-fi?retryWrites=true&w=majority
# OR
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/chai-fi?retryWrites=true&w=majority

# Application Configuration  
NODE_ENV=production
FRONTEND_URL=https://your-app-domain.vercel.app
VERCEL_URL=your-app-domain.vercel.app  # Automatically set by Vercel

# Optional: For custom domain
REPLIT_DEV_DOMAIN=your-custom-domain.com
```

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account

2. **Create a Cluster**
   - Choose the free tier
   - Select a region close to your users
   - Create cluster (takes 3-5 minutes)

3. **Setup Database Access**
   - Go to Database Access → Add New Database User
   - Create a user with read/write permissions
   - Note the username and password

4. **Setup Network Access**
   - Go to Network Access → Add IP Address
   - Add `0.0.0.0/0` to allow access from anywhere (for Vercel/production)
   - In production, you can restrict this to specific IPs

5. **Get Connection String**
   - Go to Clusters → Connect → Connect your application
   - Choose Node.js driver
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>` with your values

## Vercel Deployment Guide

### Step 1: Import Project to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Step 2: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
MONGODB_URI = your-mongodb-connection-string
NODE_ENV = production  
FRONTEND_URL = https://your-app-name.vercel.app
```

### Step 3: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Test the deployment

## Common Issues & Solutions

### Menu Not Showing After Deployment

This was fixed by adding proper CORS headers. If you still see issues:

1. **Clear Vercel Cache**:
   - Go to Vercel dashboard → Deployments
   - Click the three dots on latest deployment → Redeploy
   - Check "Use existing Build Cache" = OFF

2. **Check Environment Variables**:
   - Verify `MONGODB_URI` is set correctly
   - Check database connection in deployment logs

3. **Database Connection Issues**:
   - Verify MongoDB Atlas network access allows `0.0.0.0/0`
   - Check username/password in connection string
   - Ensure database user has proper permissions

### Mobile Responsiveness

The application now includes:
- ✅ Responsive viewport meta tag
- ✅ Mobile-friendly navigation with hamburger menu
- ✅ Touch-optimized buttons (min 48px height)
- ✅ Responsive typography and spacing
- ✅ Mobile-first grid layouts
- ✅ Horizontally scrollable category filters

### Cache Issues

The server now includes cache-busting headers:
```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

## Testing Production Build Locally

```bash
# Build for production
npm run build

# Start production server
npm run start

# Test at http://localhost:5000
```

## Security Considerations

1. **Database Security**:
   - Use strong passwords for MongoDB users
   - Regularly rotate database credentials
   - Monitor database access logs

2. **API Security**:
   - CORS is configured for production domains
   - API endpoints validate input data
   - No sensitive data in client-side code

3. **Environment Variables**:
   - Never commit `.env` files to git
   - Use Vercel's environment variable system
   - Different variables for dev/staging/production

## Monitoring & Maintenance

1. **Monitor Database Usage**:
   - Check MongoDB Atlas metrics
   - Monitor connection counts
   - Set up alerts for high usage

2. **Check Application Logs**:
   - Use Vercel's function logs
   - Monitor for API errors
   - Track performance metrics

3. **Regular Updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Test updates in staging first

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test database connectivity
4. Clear browser cache and try again