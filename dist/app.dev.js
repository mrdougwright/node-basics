"use strict";

var express = require("express");

var morgan = require("morgan");

var mongoose = require("mongoose");

var _require = require("./private/keys"),
    dbURI = _require.dbURI;

var Blog = require("./models/blog");

var app = express(); // connect to mongodb, with mongoose

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  return app.listen(3030);
})["catch"](function (err) {
  return console.log(err);
}); // register view engine (for dynamic html templates)

app.set("view engine", "ejs"); // listen for requests
// middleware & static files

app.use(express["static"]("public"));
app.use(morgan("dev")); // routes

app.get("/", function (req, res) {
  res.redirect("/blogs");
});
app.get("/about", function (req, res) {
  res.render("about", {
    title: "About"
  });
}); // redirects

app.get("/about-us", function (req, res) {
  res.redirect("/about");
}); // blog routes

app.get("/blogs", function (req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.render("index", {
      title: "All Blogs",
      blogs: result
    });
  })["catch"](console.log);
});
app.get("/blogs/create", function (req, res) {
  res.render("create", {
    title: "Create a blog"
  });
}); // 404
// app.use fired for every request, IF it gets here after not matching above

app.use(function (req, res) {
  res.status(404).render("404", {
    title: "404"
  });
});