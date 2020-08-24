const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { dbURI } = require("./private/keys")
const Blog = require("./models/blog")

const app = express()

// connect to mongodb, with mongoose
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3030))
  .catch(err => console.log(err))

// register view engine (for dynamic html templates)
app.set("view engine", "ejs")

// middleware & static files
app.use(express.static("public"))
// for post request object access (i.e. req.body)
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "All Blogs", blogs: result })
    })
    .catch(console.log)
})

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then(result => {
      console.log("saved blog: ", result)
      res.redirect("/blogs")
    })
    .catch(console.log)
})

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render("details", { title: "Blog Details", blog: result })
    })
    .catch(console.log)
})

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => res.json({ redirect: "/blogs" }))
    .catch(console.log)
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a blog" })
})

// 404
// app.use fired for every request, IF it gets here after not matching above
app.use((req, res) => {
  res.status(404).render("404", { title: "404" })
})
