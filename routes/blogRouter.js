const router = require('express').Router()
const blogCtrl = require('../controllers/blogCtrl')


router.post("/createblog",blogCtrl.createBlog);
router.get("/blogs",blogCtrl.getBlogs)

module.exports = router