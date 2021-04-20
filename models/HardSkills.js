const mongoose = require('mongoose')
const hardSkillSchema = new mongoose.Schema({
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
categorie :{
    type: String,
    required :[true,"please enter the type"],
    trim:true,
    unique :false


},


},{
timestamps:true

})
module.exports=mongoose.model("HardSkills",hardSkillSchema)