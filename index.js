import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import hotelsRoute from './routes/hotels.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
const app = express()
dotenv.config()  
const port = process.env.PORT || 8800
app.listen(port,()=> { 
    connect() 
    console.log("Connected to the server!")
})


app.use(cors())
const  connect = async() => {
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.url).then(()=>{

            console.log("Connected to MongoDb!")
        }).catch(err=>console.log("Error"))
    } catch(error){
        throw error;
    }
};
mongoose.connection.on("disconnected", ()=> {
    console.log("Disconnected!")
})

app.use(cookieParser())  
app.use(express.json())

app.use('/api/auth',authRoute)  
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went Wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

// app.get('/',(req,res) => {
//     res.send("Hello Worl fddfd!")
// })

