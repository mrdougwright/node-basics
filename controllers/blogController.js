const Blog = require("../models/blog")

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render("blogs/index", { title: "All Blogs", blogs: result })
    })
    .catch(console.log)
}

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.render("blogs/details", { title: "Blog Details", blog: result })
    })
    .catch(err => {
      res.status(404).render("404", { title: "Blog not found" })
    })
}

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a blog" })
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then(result => {
      console.log("saved blog: ", result)
      res.redirect("/")
    })
    .catch(console.log)
}

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => res.json({ redirect: "/" }))
    .catch(console.log)
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
}
