var jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
    console.log("hello");
    next()
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, "process.env.JWT_SECRET");
        const { username, userID } = decoded;
        req.username = username;
        req.userID = userID;
        console.log(req.username, req.userID);
        next();
    } catch (error) {
        next("Auth error")
    }
}

module.exports = checkLogin;