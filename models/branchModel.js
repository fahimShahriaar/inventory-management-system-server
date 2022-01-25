const mongoose = require("mongoose");

// Creating new Schema
const branchSchema = new mongoose.Schema({
    branchName: String,
    branchID: String
})

//we will create a new collection
const Branch = new mongoose.model('Branch', branchSchema);

module.exports = Branch;