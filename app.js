const express = require("express")

const app = express()

// register view engine (for dynamic html templates)
app.set("view engine", "ejs")

// listen for requests
app.listen(3030)

app.get("/", (req, res) => {
  // res.send("<p>home page</p>")
  res.sendFile("./views/index.html", { root: __dirname })
})

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname })
})

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about")
})

// 404
// app.use fired for every request, IF it gets here after not matching above
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname })
})
