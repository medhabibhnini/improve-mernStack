const mongoose = require('mongoose')

const MicroSkills = new mongoose.Schema({
title :{
    type: String,
    required :[true,"please enter the title"],
    trim:true

},
description :{
    type: String,
    required :[true,"please enter the description"],
    trim:true

},
macroId:[
    {type:mongoose.Schema.Types.ObjectId, ref: 'MacroSkills'}
  ],

  image: {
    type: String,
  }

},{
timestamps:true

})
module.exports=mongoose.model("MicroSkills",MicroSkills)