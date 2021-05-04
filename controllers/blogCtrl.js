const Blogs = require('../models/BlogModel');
const User = require ('../models/userModel')
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
const blogCtrl ={
    createBlog: async(req, res) =>{
        try {
            const {title,description,user} = req.body;
            let users = await User.findById(user).select("-password");
            

            const newBlog = new Blogs({
        title: title.toLowerCase(), description,user:users,name:users.name,avatar:users.avatar
            })

            await newBlog.save()
            res.json({msg: "Created a Bloag"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getBlogs: async(req, res) =>{
        try {
            const features = new APIfeatures(Blogs.find(), req.query)
           

            const blogs = await features.query

            res.json({
                //status: 'success',
                result: blogs.length,
                blogs: blogs
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = blogCtrl