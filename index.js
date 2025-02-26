require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')




const app = express()

app.use(cors())

app.use(express.json())

app.listen(process.env.PORT_NUMBER, () => console.log(`Server running on port ${process.env.PORT_NUMBER}`))