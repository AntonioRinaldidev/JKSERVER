require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/User');
const setupSwagger = require('./swaggerConfig');

//**DB CONNECTION */
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));


const app = express()
setupSwagger(app);
app.use(express.json())
//**ROUTE SECTION */
app.use('/api/users', userRoutes);

app.use(cors())




app.listen(process.env.PORT_NUMBER, () => console.log(`Server running on port ${process.env.PORT_NUMBER}`))