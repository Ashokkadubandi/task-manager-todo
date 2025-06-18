const express = require('express')
const {connectedDB} = require('./utils/db')
const taskRoute = require('./routes/taskRoutes.js')
const CORS = require('cors')
const app = express()
require('dotenv').config()
const {PORT} = process.env

app.use(express.json())
app.use(CORS())

const initilizeDBServer = async () =>{
    app.listen(PORT,() => {
        console.log(`app running on port ${PORT}`)
        connectedDB()
    })
}


initilizeDBServer()

app.use('/api/tasks',taskRoute)
