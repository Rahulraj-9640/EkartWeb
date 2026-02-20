import mongoose from "mongoose";

const connectDB = async()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/Ekart`) 
       console.log('MongoDB connection successfully');
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
}

export default connectDB