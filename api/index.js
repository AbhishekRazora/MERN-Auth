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

// == for local enviroment (Local host) == //
// app.use(cors({origin:'http://localhost:5173',credentials:true}))



// app.use(cors({origin:'https://mern-auth-q7id.onrender.com/',credentials:true}))

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://mern-auth-q7id.onrender.com/"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
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