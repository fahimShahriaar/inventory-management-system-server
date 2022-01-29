const express = require('express');
const adminRouter = express.Router();
const checkLogin = require('../../middlewares/checkLogin');
const Branch = require('../../models/branchModel');

// Admin Dashboard
adminRouter.get('/dashboard', checkLogin, async (req, res) => {
    console.log(req.username);
    console.log(req.userID);
    res.send("Admin dashboard");
});

// Create Store
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
    } catch (error) {
        res.send("Error")
    }
})

// Create BIN
adminRouter.put('/branch/:branchid/:storeid', async (req, res) => {
    console.log('branchid', req.params.branchid);
    console.log('storeid', req.params.storeid);
    try {
        const branch = await Branch.findOne({ _id: req.params.branchid });
        // console.log(branch);
        const store = branch.stores.find(store => store._id.toString() === req.params.storeid.toString());
        const index = branch.stores.indexOf(store);
        // console.log("stores", branch.stores);

        console.log(req.body);
        // console.log("store", store);
        // console.log("index", index);

        // console.log(req.body);

        const result = await Branch.updateOne(
            { _id: req.params.branchid, "stores._id": req.params.storeid },
            { $push: { 'stores.$.bins': req.body } }
        )
        res.send(result);
    } catch (error) {
        res.send("Error")
    }

    // res.send(req.body);
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

// GET a single branch by ID
adminRouter.get('/branch/:id', async (req, res) => {
    try {
        const branch = await Branch.findOne({ _id: req.params.id });
        res.send(branch)
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