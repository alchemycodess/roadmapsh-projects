import express from "express"
import authMiddleware from "./auth.js"
import fs from "fs"

const app = express()
const port = 3000

app.get("/", (req, res) => {
    const articles = fs.readdirSync("storage", "utf-8")
   
    // for (let i = 0; i < fileData.length; i++) {
    //     const element = fileData;
    //     console.log(element)
    // }

    res.render("index", {articles})
    
})
app.use("/admin", authMiddleware)

app.get("/admin", (req, res) => {
    res.send("Hello world private page")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})