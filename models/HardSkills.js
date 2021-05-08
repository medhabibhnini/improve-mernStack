const mongoose = require('mongoose')
const hardSkillSchema = new mongoose.Schema({
title :{
    type: String,
    required :[true,"please enter the title"],
    trim:true,

},

description :{
    type: String,
    required :[true,"please enter the description"],
    trim:true,

    
},
type :{
    type: String,
    required :[true,"please enter the type"],
    trim:true,


},
categorie :{
    type: String,
    required :[true,"please enter the type"],
    trim:true,


},


},{
timestamps:true

})
module.exports=mongoose.model("HardSkills",hardSkillSchema)