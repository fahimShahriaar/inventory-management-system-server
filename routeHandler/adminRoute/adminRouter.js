const express = require('express');
const adminRouter = express.Router();
const Branch = require('../../models/branchModel');

adminRouter.get('/', async (req, res) => {
    res.send("Admin dashboard");
});

// GET ALL Branches
adminRouter.get('/branches', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.send(branches)
    } catch (error) {
        res.status(500).json({ error });
    }
})

// POST a new branch
adminRouter.post('/branch', async (req, res) => {
    try {
        const branch = new Branch(req.body);
        const result = await branch.save();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});




module.exports = adminRouter;