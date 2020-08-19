const http = require("http")
const fs = require("fs")
const _ = require("lodash")

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  // set header content type
  res.setHeader("Content-Type", "text/html")

  // user path?
  let path = "./views/"
  console.log("req url", req.url)

  // routing best handled in Express.js
  switch (req.url) {
    case "/":
      path += "index.html"
      res.statusCode = 200
      break
    case "/about":
      path += "about.html"
      res.statusCode = 200
      break
    case "/about-me":
      res.statusCode = 301
      res.setHeader("Location", "/about")
      res.end()
      break
    default:
      path += "404.html"
      res.statusCode = 404
      break
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    err ? console.log(err) : res.write(data)
    res.end()
  })
})

server.listen(3030, "localhost", () => {
  console.log("listening to server requests on port: 3030")
})
