import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import employeeRouter from './routes/employeeRoutes.js'
const app = express()

app.use(express.static('public'))
app.use(express.json())

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
