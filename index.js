const express = require("express")
const { connection } = require("./db/db")
const cors = require("cors")
const userRoute = require("./Routes/UserRoutes")
const blogsRoute = require("./Routes/blogsRoute")
const app = express()
app.use(cors())
app.use(express.json())


app.use("/", userRoute)
app.use("/blogs", blogsRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to server")
        console.log("connected to database")
    }
    catch (err) {
        console.log(err)
    }
})


