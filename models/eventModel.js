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
    unique :false

},
type :{
    type: String,
    required :[true,"please enter the type"],
    trim:true,
    unique :false

},

state :{
    type: Boolean,
    required :[true,"please enter the type"],
    trim:true,

},

localisation :{
    type: String,
},

link :{
    type: String,
},

date:{
    type: Date,

},

etatevent:{
    type: Boolean,
    required :[true, "peyant ou gratuit ?"]
},

price:{
    type: Number,
},

avatar: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
}

},{
timestamps:true

})
module.exports=mongoose.model("Events",eventSchema)