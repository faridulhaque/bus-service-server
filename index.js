import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from 'morgan'


dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ "policy": "cross-origin" }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: "300mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }))
app.use(cors())



// mongoose connect
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT, ()=> console.log(`server has been connected to ${PORT}`))
})
.catch((error)=> console.log(error, `did not connect to ${PORT}`))