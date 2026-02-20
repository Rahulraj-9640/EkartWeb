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
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders', orderRoute)

// http://localhost:8000/api/v1/user/register

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening at port:${PORT}`);
})