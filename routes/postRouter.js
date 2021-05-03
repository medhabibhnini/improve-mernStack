const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/posts')
    .post( postCtrl.createPost)
   
    router.route('/posts/:blog_id')
    .get(postCtrl.getPosts)
   
router.route('/posts/:id')
    .delete( postCtrl.deletePost)
    .put( postCtrl.updatePost)
    
router.route('/posts/remove_like_from_post/:post_id/:like_id')
    .delete(postCtrl.removeLikefromPost)
    /*
router.route('/posts/likes/:post_id')
      .put(postCtrl.likePost)*/
router.put("/posts/likes/:post_id",  postCtrl.likePost);
router.put("/posts/add_comment/:post_id", postCtrl.addComment);
      
router.put("/posts/like_comment/:post_id/:comment_id",  postCtrl.likeComment);
      
router.delete("/posts/delete_post/:post_id", postCtrl.removePost);
      
      
router.delete("/posts/remove_comment/:post_id/:comment_id",postCtrl.removeComment);
      
router.delete("/posts/remove_like_from_comment/:post_id/:comment_id/:like_id",postCtrl.removeLikeFromComment );

router.get("/posts/most_liked/:blog_id", postCtrl.getMostLikedPost);

router.get("/posts/the_most_recent/:blog_id", postCtrl.getPostByDate);

router.get("/posts/the_most_commented/:blog_id", postCtrl.getMostCommentedPost);

router.get("/posts/single_post/:post_id", postCtrl.getSinglePost);

router.get("/posts/user_posts/:user_id", postCtrl.getUserPostbyId);

router.get("/posts/user_postsMiddleware",  postCtrl.getUserPostbyMiddleware);

router.put("/posts/search_for_post",  postCtrl.searchForPost);

module.exports = router