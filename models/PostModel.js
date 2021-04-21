const mongoose = require("mongoose");

let PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      textOfTheComment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
  ],
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
