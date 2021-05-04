const mongoose = require('mongoose')
const softSkillSchema = new mongoose.Schema({
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
type:[
    {type:mongoose.Schema.Types.ObjectId, ref: 'MicroSkills'}
  ],


},{
timestamps:true

})
module.exports=mongoose.model("SoftSkills",softSkillSchema)