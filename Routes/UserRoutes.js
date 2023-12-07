const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../Model/UserModel")
const userRoute = express.Router()


userRoute.post("/register", async (req, res) => {
    try {
        let isRegistered = await userModel.findOne({ email: req.body.email })
        if (isRegistered) {
            res.status(200).send({ "msg": "User already registered, Please Login" })
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    res.status(200).send({ "msg": `${err}` })
                }
                else {
                    let newuser = userModel({ ...req.body, password: hash })
                    await newuser.save()
                    res.status(200).send({ "msg": "User Registered Successfully" })
                }
            })
        }
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})


userRoute.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                if (result) {
                    let token = jwt.sign({ userID: user._id }, "masai", { expiresIn: "7d" })
                    res.status(200).send({ "msg": "login successful", "token": token, "username": user.username })

                }
                else {
                    res.status(200).send({ "msg": "login failed" })
                }
            })
        }
        else {
            res.status(200).send({ "msg": "User Not Found" })
        }
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})



module.exports = userRoute
