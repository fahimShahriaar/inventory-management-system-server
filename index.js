const express = require('express');
var cors = require('cors')
require('./db/connection');
const Branch = require('./models/branchModel');
const adminRouter = require('./routeHandler/adminRoute/adminRouter');

const app = express();

//middleware
app.use(express.json());
app.use(cors());
// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
})

// admin route handler
app.use('/admin', adminRouter);

app.listen(5000, () => {
    console.log('listen port on 5000')
})