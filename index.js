const express = require('express');
var cors = require('cors')
require('./db/connection');
const Branch = require('./models/branchModel');

const app = express();

//middleware
app.use(express.json());
app.use(cors());
// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
})

// GET ALL Branches
app.get('/', (req, res) => {
    res.send('API testing... Homepage');
});

// POST a new branch
app.post('/branch', async (req, res) => {
    try {
        const branch = new Branch(req.body);
        const result = await branch.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }


});

// GET ALL DATA
try {
    app.get('/branches', async (req, res) => {
        const branches = await Branch.find();
        res.send(branches);
    })
} catch (err) {
    res.send(err);
}

app.listen(5000, () => {
    console.log('listen port on 5000')
})