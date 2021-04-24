const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
title :{
    type: String,
    required :[true,"please enter the title"],
    trim:true,
    unique :true

},

description :{
    type: String,
    required :[true,"please enter the description"],
    trim:true,
    unique :true

},
type :{
    type: String,
    required :[true,"please enter the type"],
    trim:true,
    unique :true

},

avatar: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
}

},{
timestamps:true

})
module.exports=mongoose.model("Events",eventSchema)