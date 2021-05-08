const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
title :{
    type: String,
    required :[true,"please enter the title"],
    unique: false

},

description :{
    type: String,
    required :[true,"please enter the description"],
    unique :false

},
type :{
    type: String,
    trim:true,
    unique:false

},

state :{
    type: String,
    unique: false


},

localisation :{
    type: String,
    unique: false,
    required:false
},

link :{
    type: String,
    unique: false

},

date:{
    type: Date,
    default: Date()

},

etatevent:{
    type: String,
    required: false,
    unique: false
},

price:{
    type: Number,
    required:false,
    unique: false

},

avatar: {
    type: String,
    default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"

}

},{
timestamps:true

})
module.exports=mongoose.model("Events",eventSchema)