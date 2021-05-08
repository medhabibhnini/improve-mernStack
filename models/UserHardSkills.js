const mongoose = require('mongoose')

const UserHardSkills = new mongoose.Schema({
score :{
    type: Number,
    required :[true,"please enter the score"],
    trim:true

},
UserId:[
    {type:mongoose.Schema.Types.ObjectId, ref: 'Users'}
  ],
SkillId :[
    {type: mongoose.Schema.Types.ObjectId, ref: 'HardSkills'}

],

  

},{
timestamps:true

})
module.exports=mongoose.model("UserHardSkills",UserHardSkills)