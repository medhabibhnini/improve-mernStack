const mongoose = require("mongoose");

let BlogSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    }
})
const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;