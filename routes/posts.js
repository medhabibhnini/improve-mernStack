const router =require('express').Router()
const createPosts = require('../controllers/createPost')

/*ajout post***/
router.post('/ajoutPost',createPosts.create)
module.exports=router