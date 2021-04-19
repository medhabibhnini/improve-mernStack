const Courses = require('../models/courseModel')

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

const courseCtrl = {
    getCourses: async(req, res) =>{
        try {
            const features = new APIfeatures(Courses.find(), req.query)
            .filtering().sorting().paginating()

            const courses = await features.query

            res.json({
                status: 'success',
                result: courses.length,
                courses: courses
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCourse: async(req, res) =>{
        try {
            const {course_id, title, price, description, image, category, link} = req.body;
            if(!image) return res.status(400).json({msg: "No image upload"})

            const course = await Courses.findOne({course_id})
            if(course)
                return res.status(400).json({msg: "This course already exists."})

            const newCourse = new Courses({
                course_id, title: title.toLowerCase(), price, description, link, image, category
            })

            await newCourse.save()
            res.json({msg: "Created a course"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCourse: async(req, res) =>{
        try {
            await Courses.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a course"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCourse: async(req, res) =>{
        try {
            const {title, price, description, image, category, link} = req.body;
            if(!image) return res.status(400).json({msg: "No image upload"})

            await Courses.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, link , images, category
            })

            res.json({msg: "Updated a Course"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = courseCtrl