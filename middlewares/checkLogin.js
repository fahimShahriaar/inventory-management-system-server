const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, userID } = decoded;
        // console.log("decoded:", decoded);
        req.username = username;
        req.userID = userID;
        next();
    } catch (err) {
        next("Authentication failure!");
    }
};

module.exports = checkLogin;