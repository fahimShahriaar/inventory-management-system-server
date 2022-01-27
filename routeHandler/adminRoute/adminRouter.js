const express = require('express');
const adminRouter = express.Router();
const Branch = require('../../models/branchModel');

// Admin Dashboard
adminRouter.get('/dashboard', async (req, res) => {
    res.send("Admin dashboard");
});

adminRouter.put('/branch/:id', async (req, res) => {
    try {
        console.log("req body", req.body);
        // const { storeID, storeName } = req.body;
        console.log(req.params.id);
        const result = await Branch.updateOne(
            { _id: req.params.id },
            { $push: { stores: req.body } }
        );

        res.send(result);

        // const updatedBranch = await Branch.updateOne({ _id: req.params.id }, {
        //     $set: {
        //         store: {
        //             storeID: storeID,
        //             storeName: storeName
        //         }
        //     }
        // })

        // UPDATE branch here
        // const storeID = req.body.newStoreState.storeID;
        // const storeName = req.body.newStoreState.storeName;
        // const updatedBranch = await Todo.updateOne({ _id: req.params.id }, {
        //     $set: {
        //         store: {
        //             storeID,
        //             storeName
        //         }
        //     }
        // })



    } catch (error) {
        res.send("Error")
    }
})

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