const mongoose = require('mongoose')

const UserSoftSkills = new mongoose.Schema({
score :{
    type: Number,
    required :[true,"please enter the score"],
    trim:true

},
UserId:[
    {type:mongoose.Schema.Types.ObjectId, ref: 'Users'}
  ],
SkillId :[
    {type: mongoose.Schema.Types.ObjectId, ref: 'SoftSkills'}

],

  

},{
timestamps:true

})
module.exports=mongoose.model("UserSoftSkills",UserSoftSkills)