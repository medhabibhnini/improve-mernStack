const Posts = require('../models/postModel');
const User = require ('../models/userModel')
// Filter, sorting and paginating
const { validationResult } = require("express-validator");
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {
    getPosts: async(req, res) =>{
        try {
            const features = new APIfeatures(Posts.find({blog_id : req.params.blog_id}), req.query)
           

            const posts = await features.query

            res.json({
                status: 'success',
                result: posts.length,
                posts: posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPost: async(req, res) =>{
        try {
            const {title,description,user,blog_id} = req.body;
            let users = await User.findById(user).select("-password");

            const newPost = new Posts({
        title: title.toLowerCase(), description,user:users,name:users.name,avatar:users.avatar,blog_id:blog_id
            })

            await newPost.save()
            res.json({msg: "Created a post"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async(req, res) =>{
        try {
            await Posts.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Post"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async(req, res) =>{
        try {
            const {title,  description} = req.body;

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), description
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
      try {
       const {user} = req.body;
        let post = await Posts.findById(req.params.post_id);
        let users = await User.findById(user).select("-password");
        if (!post) return res.status(404).json("Post not found");
    
        if (post.likes.find((like) => like.user === user))
       
          return res.status(401).json("Post is already liked by you!");
    
        let newLike = {
          user: users,
        };
    
        post.likes.unshift(newLike);
    
        await post.save();
    
        res.json(post);
      } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
      }
      },
      removeLikefromPost: async (req, res)=>{
        try {
            let post = await Posts.findById(req.params.post_id);
        
            if (!post) return res.status(404).json("Post not found");
        
            const removeLikeFromPost = post.likes.filter(
              (like) => like.id.toString() !== req.params.like_id.toString()
            );
        
            post.likes = removeLikeFromPost;
        
            await post.save();
        
            res.json(post);
          } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
          }
      },
      addComment: async (req, res) => {
        try {
          
          const { textOfTheComment , auth } = req.body;
          let post = await Posts.findById(req.params.post_id);
          let users = await User.findById(auth.user._id).select("-password");
         
          
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
      
          if (!users) return res.status(404).json("User not found");
      
          if (!post) return res.status(404).json("Post not found");
      
          let newComment = {
            textOfTheComment,
            name: users.name,
            avatar: users.avatar,
          };
          post.comments.unshift(newComment);
      
          await post.save();
      
          res.json("Comment is added");
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      removePost:async (req, res) => {
        try {
          let post = await Posts.findById(req.params.post_id);
      
          if (!post) return res.status(404).json("Post not found");
      
      
          await post.remove();
      
          res.json("Post is removed!");
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getMostLikedPost:async (req, res) => {
        try {
          //We order from the most to the least liked, as default sort is assigned as 1, when you use -1 you basically reverse the order of array
          let posts = await Posts.find({blog_id : req.params.blog_id}).sort({ likes: -1 });
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getMostCommentedPost:async (req, res) => {
        try {
          let posts = await Posts.find({blog_id : req.params.blog_id}).sort({ comments: -1 });
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      } ,
      getUserPostbyId:async (req, res) => {
        try {
          console.log(req.params.user_id)
          
          let posts = await Posts.find({ user: req.params.user_id });
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getUserPostbyMiddleware:async (req, res) => {
        try {
          let posts = await Posts.find();
          let userPosts = posts.filter(
            (post) => post.user.toString() === req.user.id.toString()
          );
          res.json(userPosts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getPostByDate:async (req, res) => {
        try {
          let posts = await Posts.find().sort({ date: -1 });
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      likeComment:async (req, res) => {
        try {
          const {user} = req.body;
          let post = await Posts.findById(req.params.post_id);
          let users = await User.findById(user).select("-password");
      
          if (!post) return res.status(404).json("Post not found!");
      
          const commentFromPost = post.comments.find(
            (comment) => comment._id.toString() === req.params.comment_id.toString()
          );
      
          if (!commentFromPost) return res.status(404).json("Comment not found");
      
          let newLike = {
            user: users,
          };
      
          commentFromPost.likes.unshift(newLike);
      
          await post.save();
      
          res.json("Comment is liked");
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      removeComment:async (req, res) => {
        try {
          let post = await Posts.findById(req.params.post_id);
      
          if (!post) return res.status(404).json("Post not found");
      
          const removeCommentFromComments = post.comments.filter(
            (comment) => comment._id.toString() !== req.params.comment_id
          );
      
          post.comments = removeCommentFromComments;
      
          await post.save();
      
          res.json(post);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      removeLikeFromComment:async (req, res) => {
        try {
          let post = await Posts.findById(req.params.post_id);
      
          if (!post) return res.status(404).json("Post not found");
      
          const comment = post.comments.find(
            (comment) => comment._id.toString() === req.params.comment_id.toString()
          );
      
          const removeLikeFromComment = comment.likes.filter(
            (like) => like._id.toString() !== req.params.like_id.toString()
          );
      
          comment.likes = removeLikeFromComment;
      
          await post.save();
      
          res.json(post);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      searchForPost:async (req, res) => {
        const { searchInput } = req.body;
        console.log(searchInput)
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });
        try {
          let posts = await Posts.find();
          if (searchInput === "" || searchInput === null) {
            res.status(401).json(posts);
          } else {
            const findPostBySearchInput = posts.filter(
              (post) =>
                post.title.toString().split(" ").join("") ===
                searchInput.toString().toLowerCase().split(" ").join("")
            );
            res.json(findPostBySearchInput);
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getSinglePost:async (req, res) => {
        try {
          let posts = await Posts.findById(req.params.post_id);
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      },
      getPostByDate:async (req, res) => {
        try {
          let posts = await Posts.find({blog_id : req.params.blog_id}).sort({ date: -1 });
          res.json(posts);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Server Error...");
        }
      }



}


module.exports = postCtrl