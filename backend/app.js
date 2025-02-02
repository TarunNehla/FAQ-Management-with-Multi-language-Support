const express = require('express');
const app = express();
require('dotenv').config();
require('./models/dbConnection');
const faqRoutes = require('./routes/faqRoutes');
const cors = require('cors');
const middleware = require('./utils/middleware')

app.use(express.static('dist'))

app.use(cors());

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Wecome to backend')
})

app.use(middleware.requestLogger)

app.use('/api',faqRoutes);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app