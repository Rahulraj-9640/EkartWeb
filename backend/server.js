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

// CORS configuration for development and production
const allowedOrigins = [
    'http://localhost:5173',  // Local development
    'http://localhost:3000',   // Alternative local port
    process.env.FRONTEND_URL   // Production Vercel URL (set in .env)
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

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