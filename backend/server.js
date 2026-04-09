import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js'
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoutes.js'
import cartRoute from './routes/cartRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())

// // CORS configuration for development and production
// const allowedOrigins = [
//     'http://localhost:5173',  // Local development
//     'http://localhost:3000',   // Alternative local port
//     'http://localhost:5174',   // Another local port
//     'https://ekart-rahul.vercel.app',  // Production Vercel URL
//     process.env.FRONTEND_URL?.trim()   // Additional frontend URL from .env
// ].filter(Boolean)

// console.log('🔐 CORS Allowed Origins:', allowedOrigins)

// app.use(cors({
//     origin: (origin, callback) => {
//         console.log('📍 Request origin:', origin)
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true)
//         } else {
//             console.log('❌ CORS rejected origin:', origin)
//             callback(new Error('CORS policy violation'))
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }))



// fix by ChatGPT
const allowedOrigins = [
  "http://localhost:5173",
  "https://ekart-rahul.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  },
  credentials: true
}));

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders', orderRoute)

// http://localhost:8000/api/v1/user/register

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Database connection failed ❌", error)
        process.exit(1)
    })