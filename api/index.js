import express from 'express'
import { config } from 'dotenv';
import {connect,disconnect} from 'mongoose'
import router from './routes/index.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import path from 'path';
config()

const __dirname=path.resolve();

const app=express();


app.use(express.static(path.join(__dirname,'/client/dist')))


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/api/v1',router)



async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("can't connect to MongoDB")
        
    }
}
async function disconnectToDatabase(){
    try {
        await disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("can't disconnect to MongoDB")
        
    }
}





app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })

})







const port=8080;

connectToDatabase().then(()=>{

    app.listen(port,()=>{
        console.log('server started at port 8080 and also connect to database')
    })
}).catch((error)=>{
    console.log(error)
})