import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import ManageProductRoutes from './src/routes/manageProductRoutes/ManageProductRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

app.use('/api/manage-products', ManageProductRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`MongoDB Connected`)
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    })