const router = require('express').Router();
const posts = require('../models/post');
const auth = require('../middleware/auth')

router.route('/add').post(auth,(req,res)=>
{
const email = req.body.email;
const description=req.body.description;
const date =Date.parse(req.body.date);
const newPost = new post({
email,
description,

date

});
newPost.save()
        .then(()=>res.json('post added !'))
        .catch(err => res.status(400).json('Error' + err));
});