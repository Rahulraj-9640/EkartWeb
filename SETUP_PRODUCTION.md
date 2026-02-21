# 🚀 COMPLETE SETUP GUIDE - Ekart Deployment

## 1. RENDER BACKEND SETUP

### Backend का URL:
```
https://ekartweb-tfkn.onrender.com
```

### Render Dashboard में Environment Variables Add करें:

1. Render.com पर जाओ
2. अपनी backend service खोलो (EkartWeb या कोई नाम)
3. **Settings** → **Environment** में जाओ
4. नीचे दिए गए सभी variables को add करो:

```env
# Database - MongoDB Atlas से मिलेगा
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net

# JWT Secret - कोई भी 32+ character random string
SECRET_KEY=your-super-secret-key-min-32-chars-long

# Frontend URL - जहां Vercel पर डिप्लॉय हुआ है
FRONTEND_URL=https://ekart-web-five.vercel.app

# Cloudinary - image uploads के लिए
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key-numbers
CLOUDINARY_API_SECRET=your-api-secret

# Email Service - Gmail से App Password
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_SECRET=rzp_live_your_secret

# Port
PORT=8000
```

5. **Save** करो
6. Service automatically redeploy होगी (5-10 minutes)

---

## 2. VERCEL FRONTEND SETUP

### Frontend का URL:
```
https://ekart-web-five.vercel.app
```

### Vercel में Environment Variables Set करने के लिए:

1. Vercel.com पर जाओ
2. आपकी frontend project: **ekart-web** खोलो
3. **Settings** → **Environment Variables** में जाओ
4. इन variables को add करो:

```env
VITE_URL=https://ekartweb-tfkn.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_your_key_id
```

5. **Save** करो
6. Automatic redeploy होगा या **Redeploy** बटन दबा दो

---

## 3. GIT PUSH करने के बाद

### Command Line में:
```bash
git add .
git commit -m "setup: Add production environment variables"
git push
```

---

## 4. VERIFICATION CHECKLIST

**Backend के लिए:**
- [ ] Render dashboard में सभी env variables दिखें
- [ ] Service को 5-10 minutes redeploy होने दो
- [ ] Backend URL खोलो: `https://ekartweb-tfkn.onrender.com/api/v1/product/getallproducts`
- [ ] JSON response मिले (products array, भले ही खाली हो)

**Frontend के लिए:**
- [ ] Vercel dashboard में env variables दिखें
- [ ] Deployment complete हो
- [ ] Frontend URL खोलो
- [ ] Products page पर जाओ
- [ ] Browser console में कोई CORS error नहीं हो

---

## 5. COMMON ISSUES & FIX

### Issue 1: Products नहीं दिख रहे
```
✅ Check: Console में CORS error तो नहीं?
✅ Check: Network tab में API response 200 OK तो है?
✅ Check: MongoDB में products data तो है?
```

### Issue 2: CORS Error आ रहा है
```
✅ Check: FRONTEND_URL बिना trailing slash के है?
✅ Check: Render redeploy हो गया?
✅ Check: कोई typo तो नहीं Vercel URL में?
```

### Issue 3: Login/Signup नहीं काम कर रहा
```
✅ Check: MAIL_USER और MAIL_PASS सही हैं?
✅ Check: Gmail के लिए App Password use की?
✅ Check: Backend MONGO_URI connect हो गया?
```

---

## 6. MONGO_URI कैसे मिलेगा

1. MongoDB Atlas (mongodb.com) पर जाओ
2. अपने cluster को खोलो
3. **Connect** बटन दबाओ
4. **Drivers** → **Node.js** चुनो
5. Connection string copy करो (कुछ यूं होगा):
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```
6. अपनी username और password दाल दो

---

## 7. CLOUDINARY SETUP

1. Cloudinary (cloudinary.com) पर signup करो (free है)
2. Dashboard में:
   - Cloud Name copy करो
   - दाईं तरफ API Keys में API Key और Secret मिलेंगे
3. इन्हें Render में add करो

---

## 8. RAZORPAY SETUP (Optional for now)

बाद में add सकते हो, अभी के लिए test key डाल दो:
```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_SECRET=rzp_test_xxxxx
```

---

## अगर अब भी issue हो तो:
- Browser Console screenshot share करो (F12 → Console)
- Network tab का screenshot share करो (F12 → Network)
- Render logs share करो (Render dashboard → Logs)
