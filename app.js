const express = require("express")

const app = express()

// register view engine (for dynamic html templates)
app.set("view engine", "ejs")

// listen for requests
app.listen(3030)

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi", snippet: "Some text" },
    { title: "Mario", snippet: "Some more text" },
    { title: "Bowser", snippet: "Some more more text" },
  ]
  res.render("index", { title: "Index", blogs })
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a blog" })
})

// 404
// app.use fired for every request, IF it gets here after not matching above
app.use((req, res) => {
  res.status(404).render("404", { title: "404" })
})
