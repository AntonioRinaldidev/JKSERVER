require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/User');
const setupSwagger = require('./swaggerConfig');

//**DB CONNECTION */



const app = express()
setupSwagger(app);

//**ROUTE SECTION */
app.use('/api/users', userRoutes);

app.use(cors())


app.use(express.json())

app.listen(process.env.PORT_NUMBER, () => console.log(`Server running on port ${process.env.PORT_NUMBER}`))