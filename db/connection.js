const monsoose = require("mongoose");

monsoose.connect("mongodb://localhost:27017/inventory").then(() => {
    console.log("connection is successfull");
}).catch((e) => {
    console.log("No connect")

})