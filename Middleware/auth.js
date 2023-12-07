const express = require("express")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]
        jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                res.status(200).send({ "msg": "Please Login" })
            }
            else {
                req.body.userID = decoded.userID
                next()
            }
        })
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
}

module.exports = auth
