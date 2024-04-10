const express = require("express");
const currentUser = require("../middlewares/current-user.middleware");
const requireAuth = require("../middlewares/require-auth.middleware");
const User = require("../models/User.model");
const Blog = require("../models/blog.model");

const router = express.Router();

router.get("/:blogId", currentUser, requireAuth, async (req, res) => {
  const blogId = req.params.blogId;
  const userId = req.currentUser.id;
  const user = await User.findById(userId).populate("blogs").exec();

  const blog = user.blogs.filter((item) => {
    console.log("check match", item._id, blogId);
    return item._id == blogId;
  });

  res.send({ data: blog });
});

//Get
router.get("/", currentUser, requireAuth, async (req, res) => {
  const pageNo = Number(req.query.page || 0);
  const userId = req.currentUser.id;
  const user = await User.findById(userId).populate("blogs").exec();

  if (pageNo) {
    const itemsPerPage = 3;
    const fromIndex = (pageNo - 1) * itemsPerPage;
    const endIndex = fromIndex + itemsPerPage;
    user.blogs = user.blogs.slice(fromIndex, endIndex);
  }

  res.send({ data: user.blogs });
});

//Creation
router.post("/", currentUser, requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const { email: author, id: userId } = req.currentUser;
  const blog = new Blog({ title, content, author });
  const user = await User.findById(userId).exec();
  user.blogs.push(blog._id);
  blog.save();
  user.save();
  res.send({ data: [{ title: blog.title, content: blog.content }] });
});

//Update
router.put("/", currentUser, requireAuth, async (req, res) => {
  const { title, content, id } = req.body;
  try {
    const blog = await Blog.findById(id).exec();
    blog.title = title;
    blog.content = content;
    blog.updatedAt = new Date();
    blog.save();
    res.send({ data: [{ title: blog.title, content: blog.content }] });
  } catch (err) {
    console.log("Error occured");
    res.status(500).send("Internal server error");
  }
});

//Delete
router.delete("/", currentUser, requireAuth, async (req, res) => {
  const blogId = req.body.id;
  let user;
  const userId = req.currentUser.id;
  user = await User.findById(userId).exec();

  Blog.deleteOne({ _id: blogId })
    .then(() => {
      user.blogs = user.blogs.filter((blog_id) => {
        return blogId != blog_id;
      });
      user.save();
      res.send({ data: [{ title: blog.title, content: blog.content }] });
    })
    .catch((err) => {
      res.status(500).send("Internal server error");
    });
});

module.exports = {
  blogRouter: router,
};
