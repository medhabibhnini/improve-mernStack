const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/posts')
    .get(postCtrl.getPosts)
    .post( postCtrl.createPost)
   

   
router.route('/posts/:id')
    .delete( postCtrl.deletePost)
    .put( postCtrl.updatePost)
    
router.route('/like/:post_id/:like_id')
    .delete(postCtrl.removeLikefromPost)
    router.route('/like/:post_id')
    .put( postCtrl.likePost)

module.exports = router