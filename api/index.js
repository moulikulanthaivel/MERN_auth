import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./router/userRoute.js"
import authRoute from "./router/authRoute.js"

dotenv.config({"path":"./setting/.env"})
let port = process.env.PORT
let host = process.env.HOST
let url = process.env.MONGO_URL

const app = express()

app.use(express.json());

mongoose.connect(url)
.then(()=>{console.log("connected database")})
.catch(()=>{console.log('not connected')})

app.listen(port,host,(err)=>{
    if(err) throw err
    console.log(`server running successfully : http://${host}:${port}`)
})

app.use("/api/user",userRoute)
app.use("/api/auth/",authRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internet server busy";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
});

export default app