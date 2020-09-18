const express = require('express');
//const Blog = require('../models/blog');
const router = express.Router();
const blogController = require('../controllers/blogController');

//blog routes
router.get('/create', blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

//the cast error solved
//it was caused because 
//i put app.get('/blogs/create',(res,req))
// after this block
// Note Alwasy put that at first
router.get('/:id', blogController.blog_details)

router.delete('/:id', blogController.blog_delete)

module.exports = router;