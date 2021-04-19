const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  },

  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['hard skill', 'soft skill'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  
})
module.exports = mongoose.model("Courses", courseSchema)

