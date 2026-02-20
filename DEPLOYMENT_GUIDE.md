# Deployment Guide: Render (Backend) + Vercel (Frontend)

## Pre-Deployment Checklist

✅ **Before pushing to GitHub:**
- [ ] `.env` files are in `.gitignore` (already done)
- [ ] No secrets in git history: `git log --all --full-history -- backend/.env frontend/.env | head`
- [ ] Example files have PLACEHOLDER values only
- [ ] All code committed and pushed to main branch

**If you see old secrets in git history:**
```bash
# Remove file from all commits (WARNING: rewrites history)
git filter-branch --tree-filter 'rm -f backend/.env frontend/.env' HEAD
git push --force-with-lease
```

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Production

Add a `Procfile` in the `backend/` directory:

```bash
echo "web: node server.js" > backend/Procfile
```

Verify `backend/package.json` has a "start" script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

> ⚠️ Remove `nodemon` from dependencies if it's therfe — use only in devDependencies.

### Step 2: Create Render Account & Deploy

1. Go to **[render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your GitHub repo → **"Create Web Service"**
4. Fill in deployment settings:

   | Setting | Value |
   |---------|-------|
   | **Name** | ekart-backend (or your choice) |
   | **Environment** | Node |
   | **Region** | Singapore (or closest to your users) |
   | **Branch** | main |
   | **Root Directory** | `backend` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node server.js` |
   | **Plan** | Free tier (with limitations) or Paid |

5. Click **"Create Web Service"** → deployment starts

### Step 3: Add Environment Variables in Render

Once deployment finishes, go to **Settings** tab → **Environment**:

Add these variables (get values from your local `.env`):

```
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
SECRET_KEY=your_jwt_secret_here
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_SECRET=your_razorpay_secret
```

**How to get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Copy the 16-char password as `MAIL_PASS`

💾 **Save after adding variables** — Render will auto-redeploy.

### Step 4: Get Your Backend URL

After deployment succeeds:
- Your backend URL: `https://ekart-backend.onrender.com` (or similar)
- Save this for frontend config

**Test the backend:**
```bash
curl https://your-backend-url/api/v1/products
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

Ensure `frontend/package.json` has build script:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Create Vercel Account & Deploy

1. Go to **[vercel.com](https://vercel.com)** and sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repo → **"Import"**
4. Configure project:

   | Setting | Value |
   |---------|-------|
   | **Project Name** | ekart-frontend (or your choice) |
   | **Framework Preset** | Vite (auto-detected) |
   | **Root Directory** | `frontend` |
   | **Build Command** | `npm run build` (auto-filled) |
   | **Output Directory** | `dist` (auto-filled) |
   | **Install Command** | `npm install` (auto-filled) |

5. Click **"Deploy"** → deployment starts

### Step 3: Add Environment Variables in Vercel

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

   ```
   VITE_URL=https://your-backend-render-url.onrender.com
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx (same as backend)
   ```

   > ⚠️ **IMPORTANT:** These are public/semi-public values (displayed in frontend). Use test keys for development!

3. Click **"Save and Redeploy"**

### Step 4: Verify Deployment

After deployment succeeds:
- Your frontend URL: `https://ekart-frontend.vercel.app` (or custom domain)
- Visit it in browser → should load with no errors
- Check Console (F12) for any CORS or API errors

---

## Part 3: Connect Frontend ↔ Backend

### Enable CORS in Backend

Edit `backend/server.js`:

```javascript
import cors from 'cors';

app.use(cors({
  origin: ['https://ekart-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

> Update `https://ekart-frontend.vercel.app` with your actual Vercel URL.

**Push this change:**
```bash
git add backend/server.js
git commit -m "Add Vercel URL to CORS whitelist"
git push
```

Render will auto-redeploy.

### Test Full Flow

1. Visit `https://your-frontend.vercel.app`
2. Go to Products page → should load products from your backend ✅
3. Try adding to cart, checkout → should work end-to-end ✅

---

## Part 4: Set Up Custom Domain (Optional)

### Frontend Custom Domain (Vercel)
- Go to **Settings** → **Domains**
- Add your domain: `www.ekart.com` or `app.ekart.com`
- Update your domain registrar's DNS to point to Vercel

### Backend Custom Domain (Render)
- Go to **Settings** → **Custom Domains**
- Add subdomain: `api.ekart.com`
- Update DNS records as instructed

---

## Monitoring & Logs

### Render Logs
- Go to **Logs** tab to see server errors
- **Metrics** tab for uptime, CPU, memory

### Vercel Analytics
- Dashboard shows deployments, logs, performance
- **Function Logs** for serverless edge issues

---

## Troubleshooting

### Backend won't deploy
```bash
# Check if Procfile exists
cat backend/Procfile  # should show: web: node server.js

# Check start script in package.json
cat backend/package.json | grep -A2 '"scripts"'
```

### Frontend has CORS errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Update CORS origin in `backend/server.js` with your Vercel URL.

### Env variables not loaded
- **Render:** Redeploy after adding env vars (green deploy button)
- **Vercel:** Automatically redeploys, but refresh browser cache (Ctrl+Shift+R)

### MongoDB connection fails
- Check `MONGO_URI` format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
- Ensure IP is whitelisted in MongoDB Atlas → Network Access (allow 0.0.0.0/0 for free tier)

### Razorpay payments fail
- Use **test keys** for development (rzp_test_xxx)
- Switch to **live keys** (rzp_live_xxx) only when going live
- Update both backend (`RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`) and frontend (`VITE_RAZORPAY_KEY_ID`)

---

## Next Steps

1. **Domain Setup:** Buy a domain → point to Render (backend) + Vercel (frontend)
2. **SSL Certificate:** Both platforms provide free SSL by default
3. **Analytics:** Set up email alerts on Render/Vercel dashboards
4. **Backups:** Set MongoDB backup schedule in Atlas
5. **CI/CD:** Both platforms auto-deploy on `git push` — no extra config needed!

---

## Quick Reference

| Service | URL | Dashboard |
|---------|-----|-----------|
| **Backend** | `https://ekart-backend.onrender.com` | [render.com/dashboard](https://render.com/dashboard) |
| **Frontend** | `https://ekart-frontend.vercel.app` | [vercel.com/dashboard](https://vercel.com/dashboard) |
| **Database** | MongoDB Atlas | [cloud.mongodb.com](https://cloud.mongodb.com/) |
| **Email** | Gmail (with app password) | [myaccount.google.com](https://myaccount.google.com) |
| **Images** | Cloudinary | [cloudinary.com/dashboard](https://cloudinary.com/dashboard) |
| **Payments** | Razorpay | [dashboard.razorpay.com](https://dashboard.razorpay.com/) |
