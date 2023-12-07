const express = require("express")
const auth = require("../Middleware/auth")
const blogsModel = require("../Model/blogsModel")

const blogsRoute = express.Router()
blogsRoute.use(auth)

blogsRoute.get("/", async (req, res) => {
    try {
        let { category, title, sort, order } = req.query
        let searchData = {}
        if (category) {
            searchData.category = { $regex: category, $options: "i" }

        }
        if (title) {
            searchData.title = { $regex: title, $options: "i" }
        }
       
        let data = await blogsModel.find(searchData).sort({ [sort]: order == "asc" ? 1 : -1 })
        res.status(200).send({ "msg": "Success", "data": data })

    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})

blogsRoute.post("/", async (req, res) => {
    try {
        let data = blogsModel(req.body)
        await data.save()
        res.status(200).send({ "msg": "Data Adedd Successfully", "data": data })

    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})

blogsRoute.patch("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let data = await blogsModel.findOneAndUpdate({ _id: id, userID: req.body.userID }, req.body)
        if (data) {
            res.status(200).send({ "msg": "Data Updated Successfully" })
        }
        else {
            res.status(200).send({ "msg": "not authorized to update the data" })
        }

    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})


blogsRoute.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let data = await blogsModel.findOneAndDelete({ _id: id, userID: req.body.userID })
        if (data) {
            res.status(200).send({ "msg": "Data Deleted Successfully" })
        }
        else {
            res.status(200).send({ "msg": "not authorized to update the data" })
        }

    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})

blogsRoute.patch("/:id/like", async (req, res) => {
    let { id } = req.params
    try {
        let olddata = await blogsModel.findOne({ _id: id })
        let data = await blogsModel.findOneAndUpdate({ _id: id }, { likes: olddata.likes + Number(req.body.likes) })
        res.status(200).send({ "msg": "likes Updated Successfully" })
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})


blogsRoute.patch("/:id/comment", async (req, res) => {
    let { id } = req.params
    try {
        let olddata = await blogsModel.findOne({ _id: id })
        let newcomments = olddata.comments
        newcomments.push(req.body)
        let data = await blogsModel.findOneAndUpdate({ _id: id }, { comments: newcomments })
        res.status(200).send({ "msg": "Comments Updated Successfully" })
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})

module.exports = blogsRoute