const express = require('express');
var cors = require('cors')
require('./db/connection');
const adminRouter = require('./routeHandler/adminRoute/adminRouter');
const userHandler = require('./routeHandler/adminRoute/userHandler');

const app = express();
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors());
// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
})

// admin route handler
app.use('/admin', adminRouter);
app.use('/user', userHandler)

app.listen(5000, () => {
    console.log('listen port on 5000')
})