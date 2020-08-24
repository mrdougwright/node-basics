"use strict";

var Blog = require("../models/blog");

var blog_index = function blog_index(req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.render("blogs/index", {
      title: "All Blogs",
      blogs: result
    });
  })["catch"](console.log);
};

var blog_details = function blog_details(req, res) {
  Blog.findById(req.params.id).then(function (result) {
    res.render("blogs/details", {
      title: "Blog Details",
      blog: result
    });
  })["catch"](function (err) {
    res.status(404).render("404", {
      title: "Blog not found"
    });
  });
};

var blog_create_get = function blog_create_get(req, res) {
  res.render("blogs/create", {
    title: "Create a blog"
  });
};

var blog_create_post = function blog_create_post(req, res) {
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    console.log("saved blog: ", result);
    res.redirect("/");
  })["catch"](console.log);
};

var blog_delete = function blog_delete(req, res) {
  Blog.findByIdAndDelete(req.params.id).then(function (result) {
    return res.json({
      redirect: "/"
    });
  })["catch"](console.log);
};

module.exports = {
  blog_index: blog_index,
  blog_details: blog_details,
  blog_create_get: blog_create_get,
  blog_create_post: blog_create_post,
  blog_delete: blog_delete
};