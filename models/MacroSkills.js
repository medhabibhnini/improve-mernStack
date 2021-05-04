const mongoose = require('mongoose')

const MacroSkills = new mongoose.Schema({
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


},{
timestamps:true

})
module.exports=mongoose.model("MacroSkills",MacroSkills)