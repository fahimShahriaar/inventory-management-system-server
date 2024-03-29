const mongoose = require("mongoose");

// Creating new Schema
const branchSchema = new mongoose.Schema({
    branchID: String,
    branchName: String,
    branchDesc: String,
    stores: [
        {
            branchID: String,
            branchName: String,
            storeID: String,
            storeName: String,
            bins: [
                {
                    branchID: String,
                    branchName: String,
                    storeID: String,
                    storeName: String,
                    binID: String,
                    binName: String
                }
            ]
        }
    ]
})

//we will create a new collection
const Branch = new mongoose.model('Branch', branchSchema);

module.exports = Branch;