require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
require('./config/database')


app.use(express.json())

app.use(cors())

const usersRouter = require('./routes/users.router')
app.use('/api/users', usersRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))