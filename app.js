const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { dbURI } = require("./private/keys")
const blogRoutes = require("./routes/blogRoutes")

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

app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

// blog routes
app.use("/blogs", blogRoutes)

// 404
// app.use fired for every request, IF it gets here after not matching above
app.use((req, res) => {
  res.status(404).render("404", { title: "404" })
})
