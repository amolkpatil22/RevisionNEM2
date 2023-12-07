const mongoose = require("mongoose")


const blogsSchema = mongoose.Schema({   
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: Array,
    userID: String
})

const blogsModel = mongoose.model("blogs", blogsSchema)

module.exports = blogsModel