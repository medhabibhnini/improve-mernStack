const Comments = require('../models/commentModel')


class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    sorting(){
        this.query = this.query.sort('-createdAt')
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 5
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const commentCtrl = {
    getComments: async (req, res) => {
        try {
            const features = new APIfeatures(Comments.find({post_id: req.params.id}), req.query).sorting().paginating()
            
            const comments = await features.query

            res.json({
                status: 'success',
                result: comments.length,
                comments
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addComment: async (req, res)=> {
        try {
            let post = await Post.findById(req.params.post_id);
            let user = await User.findById(req.user.id).select("-password");
        
            const { textOfTheComment } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty())
              return res.status(400).json({ errors: errors.array() });
        
            if (!user) return res.status(404).json("User not found");
        
            if (!post) return res.status(404).json("Post not found");
        
            let newComment = {
              textOfTheComment,
              name: user.name,
            };
            post.comments.unshift(newComment);
        
            await post.save();
        
            res.json("Comment is added");
          } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
          }
    }
}

module.exports = commentCtrl