const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../../models/userModel');

// Signup user
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        })
        const result = await newUser.save();
        res.send(result);

    } catch (error) {
        res.send(error)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    console.log(`username:${req.body.username}`);
    console.log(`password:${req.body.password}`);

    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            // console.log(user);
            const token = jwt.sign({
                username: req.body.username,
                userID: user[0]._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            console.log(token);

            res.status(200).json({
                "access_token": token,
                "message": "Login successful"
            })
        } else {
            res.status(401).json({
                "error": "Auth Error"
            })
        }
    } catch (error) {
        res.status(401).json({
            "error": error
        })
    }
})


module.exports = router;