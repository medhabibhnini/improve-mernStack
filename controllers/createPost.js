/*const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Users = require("../models/userModel");

module.exports = async (req, res) => {
  
  let { textOfThePost } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let user = await Users.findById(req.users.id).select("-password");
    res.json(user);
    if (!user) return res.status(404).json("User not found");
    let name = user.name;
    console.log(user)
    let lastName = user.lastName;
    let userName = user.userName;
    let id= user.id;
    let newPost = new Post({
      id,
      name,
      lastName,
      userName,
      textOfThePost,
   
    });

    console.log(newPost.json);
    await newPost.save();

    res.json("Post is created, congratulations!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Servjhjher Error ...");
  }
};
*/
const Posts =require('../models/Post')

const createPosts ={
  create : async(req,res)=>
  {
    try
    { const {email,post}=req.body
    if(!email || !post)
    return res.status(400).json({msg:"please fill in all field"})
    if(!validateEmail(email))
    return res.status(400).json({msg: "Invalid emails."})
const newPost=new Posts({email,post})
await newPost.save()
res.json({msg :"post has been enregistred"})

    }
    catch (err){
      return res.status(500).json({msg:err.message})

    }







  }



}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports =createPosts



















