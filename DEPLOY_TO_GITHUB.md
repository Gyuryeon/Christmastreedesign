# Deploy to GitHub Pages - Step by Step Guide

This guide will help you deploy your Christmas Tree app so anyone can access it online!

## Overview

You need to deploy:
1. **Backend** → Free hosting service (Railway - recommended for no cold starts!)
2. **Frontend** → GitHub Pages (free!)

---

## Step 1: Create GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Christmas Tree app with backend"
```

### 1.2 Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `Christmastreedesign` (or any name you like)
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (you already have files)
6. Click **"Create repository"**

### 1.3 Push Your Code

GitHub will show you commands. Run these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Christmastreedesign.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Deploy Backend to Railway (Free & Fast - No Cold Starts!)

### 2.1 Sign Up for Railway

1. Go to [Railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with GitHub (easiest option)
4. Railway gives you $5/month free credit (usually enough for small apps)

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub account
4. Select your `Christmastreedesign` repository

### 2.3 Configure the Service

1. Railway will detect it's a Node.js project
2. Click on the service that was created
3. Go to **Settings** tab
4. Set **Root Directory** to: `server` ⚠️ **IMPORTANT!**
5. Railway will automatically detect:
   - **Build Command**: `npm install` (automatic)
   - **Start Command**: `npm start` (automatic)
6. No need to set environment variables (Railway handles PORT automatically)

### 2.4 Get Your Backend URL

1. Go to the **Settings** tab of your service
2. Under **Domains**, Railway will generate a URL automatically
3. Or click **"Generate Domain"** to create a custom one
4. Copy the full URL (e.g., `https://christmas-tree-backend-production.up.railway.app`)

### 2.5 Copy Your Backend URL

**Important:** Copy the full URL (e.g., `https://christmas-tree-backend-production.up.railway.app`)

You'll need this in the next step!

---

## Step 3: Configure Frontend for Production

### 3.1 Add Backend URL to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.up.railway.app/api`
   
   ⚠️ **Replace** `your-backend-url.up.railway.app` with your actual Railway URL!
   
5. Click **"Add secret"**

### 3.2 Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **"Source"**, select:
   - **Source**: `GitHub Actions`
3. Click **"Save"**

---

## Step 4: Deploy Frontend

### 4.1 Push to Trigger Deployment

The GitHub Actions workflow will automatically deploy when you push:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 4.2 Check Deployment Status

1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. You'll see the deployment workflow running
4. Wait for it to complete (green checkmark = success)

### 4.3 Your Site is Live! 🎉

Your site will be available at:
```
https://YOUR_USERNAME.github.io/Christmastreedesign/
```

Replace `YOUR_USERNAME` with your GitHub username (e.g., `gyuryeon.github.io/Christmastreedesign/`)

---

## Step 5: Test Your Live Site

1. Open your GitHub Pages URL
2. Wait for ornaments to load
3. Click an ornament and save a message
4. Refresh - your message should still be there!

---

## Important Notes

### Backend URL Format

Make sure your `VITE_API_URL` secret is:
- ✅ `https://your-backend.up.railway.app/api` (with `/api` at the end)
- ❌ NOT `https://your-backend.up.railway.app` (missing `/api`)

### Free Tier Limitations

**Railway Free Tier:**
- $5/month free credit (usually enough for small apps)
- **No cold starts** - service stays awake! ⚡
- Fast deployments
- Auto-scales based on usage

**GitHub Pages:**
- Completely free
- Updates automatically on every push
- Public repositories only

---

## Troubleshooting

### Backend Not Working?

1. Check Railway dashboard for errors
2. Check backend logs in Railway (click on service → Logs tab)
3. Verify the URL in GitHub secret is correct
4. Make sure Root Directory is set to `server` in Railway settings

### Frontend Can't Connect?

1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` secret is set correctly
3. Make sure backend URL has `/api` at the end

### GitHub Pages 404?

1. Check repository name matches in `vite.config.ts`
2. Verify GitHub Actions workflow completed successfully
3. Check Pages settings: Source should be "GitHub Actions"

---

## Updating Your Site

To update your live site:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy! 🚀

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Root Directory set to `server` in Railway
- [ ] Backend URL copied from Railway
- [ ] `VITE_API_URL` secret added to GitHub
- [ ] GitHub Pages enabled
- [ ] Code pushed to trigger deployment
- [ ] Site is live and working!

---

## Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for more details
- Check Railway logs if backend isn't working
- Check GitHub Actions logs if frontend isn't deploying

