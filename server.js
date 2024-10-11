import express from 'express'
import mongoose from 'mongoose'
import { rateLimit } from 'express-rate-limit'
import { slowDown } from 'express-slow-down'
import MongoStore from "rate-limit-mongo";
import 'dotenv/config'
import employeeRouter from './routes/employeeRoutes.js'
const app = express()

const requestLimiter = rateLimit({
    windowMS: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMS (per 10 minutes)
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many requests, please try again in a few minutes", // message to send as a response if the limit is exceeded
    store: new MongoStore({
        uri: process.env.MONGODB_URI,
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        collectionName: "rateLimit",
        expireTimeMS: 10 * 60 * 1000,
        errorHandler: (error) => {
            console.error("MongoStore error", error);
        },
    })
})

const speedLimiter = slowDown({
    windowMS: 10 * 60 * 1000,
    delayAfter: 100,
    delayMS: (seconds) => seconds * 1000, // 1 second delay after 100 requests
});

app.use(express.static('public'))
app.use(express.json())
app.use(requestLimiter);
app.use(speedLimiter);

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to database')
    } catch (error) {
        console.error('Error connecting to database', error)
    }
}

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html')
})

app.use('/api/v1/employees', employeeRouter)

app.listen(process.env.PORT, async () => {
    console.log(
        `Server is running on port http://localhost:${process.env.PORT}`
    )
    await connectToDatabase()
})
