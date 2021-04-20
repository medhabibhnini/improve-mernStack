const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    nameEvent: {
        type: String,
        required: [true, "Please enter the event name!"],
        trim: true,
        default:'new event'
    },
    description: {
        type: String,
        required: [true, "Please enter the description!"],
        trim: true,
        default : null,

    },
    
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Events", eventSchema)