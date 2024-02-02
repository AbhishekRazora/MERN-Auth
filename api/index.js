import express from 'express'
import { config } from 'dotenv';
import {connect,disconnect} from 'mongoose'
config()
const app=express();


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



const port=8080;

connectToDatabase().then(()=>{

    app.listen(port,()=>{
        console.log('server started at port 8080 and also connect to database')
    })
}).catch((error)=>{
    console.log(error)
})