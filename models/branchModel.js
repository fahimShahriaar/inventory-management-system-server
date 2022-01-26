const mongoose = require("mongoose");

// Creating new Schema
const branchSchema = new mongoose.Schema({
    branchID: String,
    branchName: String,
    branchDesc: String,
    store: [
        {
            storeID: String,
            storeName: String,
            bin: [
                {
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