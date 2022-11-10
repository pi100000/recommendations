const express = require('express')
const port = 4000;
const cors = require('cors')
const app = express();
const connectDB = require('./database/db')
const dotenv = require('dotenv')

dotenv.config();
connectDB() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/search', require('./routes/searchRoutes'))

app.use(express.static("assets/"))

app.listen(port, () => console.log(`listening on port ${port}`));