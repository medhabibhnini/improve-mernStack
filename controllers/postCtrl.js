const Posts = require('../models/postModel');
const User = require ('../models/userModel')
// Filter, sorting and paginating

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
            const features = new APIfeatures(Posts.find(), req.query)
           

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
            const {title,description,user} = req.body;
            let users = await User.findById(user).select("-password");

            const newPost = new Posts({
        title: title.toLowerCase(), description,user:users,name:users.name,avatar:users.avatar
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
          let post = await Posts.findById(req.params.post_id);
          const {user} = req.body;
          let users = await User.findById(user).select("-password");
          if (!post) return res.status(404).json("Post not found");
      
          if (post.likes.find((like) => like.user.toString() === user))
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
      }

}


module.exports = postCtrl