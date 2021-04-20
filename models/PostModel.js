const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
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
      avatar: {
        type: String,
      },
    title: String,
    description: String,
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
}, {
    timestamps: true
})


module.exports = mongoose.model('Posts', postSchema)