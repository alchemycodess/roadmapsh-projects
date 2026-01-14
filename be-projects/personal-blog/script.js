import express from "express"
import authMiddleware from "./auth.js"
import fs from "fs"
import { marked } from "marked"

const app = express()
const port = 3000

app.use("/admin", authMiddleware)
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")


// home page
app.get("/", (req, res) => {
    const articles = fs.readdirSync("storage", "utf-8")

    res.render("home", {articles})
    
})


//single article page
app.get("/article/:filename", (req, res) => {
  const filename = req.params.filename
  const filePath = `storage/${filename}`

  const raw = fs.readFileSync(filePath, "utf-8")
  const lines = raw.split("\n")

  const title = lines[0].replace("#", "").trim()
  const date = lines[2].replace("Date:", "").trim()

  const markdownContent = lines.slice(4).join("\n")
  const htmlContent = marked(markdownContent)

  res.render("article", {
    title,
    date,
    content: htmlContent
  })
})


app.get("/new", (req, res) => {
  res.render("new")
})


//article adding page
app.post("/new", (req, res) => {
  const {title, date, content} = req.body

  const slug = title.toLowerCase().split(" ").join("-")
  const filename = `${slug}.md`

  const cleanContent = content.trim()
  const markdown = `# ${title}

Date: ${date}

${cleanContent}
`
  console.log(markdown)

  const filePath = `storage/${filename}`

  fs.writeFileSync(filePath, markdown)

  res.redirect("/")
})


//admin page
app.get("/admin", (req, res) => {
  const files = fs.readdirSync("storage")

  const articles = files.map(filename => {
    const raw = fs.readFileSync(`storage/${filename}`, "utf-8")
    const lines = raw.split("\n")

    const title = lines[0].replace("#", "").trim()

    return {title, filename}
  })
    res.render("admin", {articles})
})


//update
app.get("/update/:filename", (req, res) => {
  const filename = req.params.filename
  const filePath = `storage/${filename}`

  const raw = fs.readFileSync(filePath, "utf-8")
  const lines =  raw.split("\n")

  const title = lines[0].replace("#", "").trim()
  const date = lines[2].replace("Date:", "").trim()
  const content = lines.slice(4).join("\n")

  res.render("update", {
    title,
    date,
    content,
    filename
  })
})

app.post("/update", (req, res) => {
  const { title, date, content, filename } = req.body

  const cleanContent = content.trim()

  const markdown = `# ${title}

Date: ${date}

${cleanContent}
`

  const filePath = `storage/${filename}`
  fs.writeFileSync(filePath, markdown)

  res.redirect("/admin")
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})