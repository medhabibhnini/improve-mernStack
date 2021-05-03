const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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

