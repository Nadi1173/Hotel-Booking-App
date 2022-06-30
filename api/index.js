import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongoDB.")
    }catch(error){
        throw error
    }
}

mongoose.connection.on("disconnected", () =>{
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", () =>{
    console.log("mongoDB connected!")
})

// middlewares
// whenever a user makes api request to express server, it will compare the path with the middlewares(and run the middleware which matches the path)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// this middleware will be executed when some middleware from above gives him chance(by calling next() function)
// check in get all section(in hotels.js)
// NOTE: comment next() function call in hotels.js, otherwise get all functionality will not work(since code will not go below that line)
// app.use((req,res,next)=>{
//     console.log("Hi I am middleware!")
// })

// middleware for error handling(it recieves one extra parameter-> error(1st param))
// NOTE: order of params must remain same
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Error hai bhai!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8800,() =>{
    connect()
    console.log("Connected to backend!")
})