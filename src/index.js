//require('dotenv').config({path:'./env'})    //either this method  or import  and config
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})
 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at PORT ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !! ",  err);
    
})

















//second method  
/*
import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants";
import express from "express"
const app= express();


(async()=>{
try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",  (error)=>{
        console.log("error",error);
        throw error    
    })

    app.listen(process.env.PORT, ()=>{
console.log(`App is listning on port ${process.env.PORT}`);
    })

} catch (error) {
    console.error("ERROR:",  error)
    
}
})()
*/