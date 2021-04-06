const { validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/userModel");

module.exports = async (req, res) => {
  
  let { textOfThePost } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("User not found");
    let name = user.name;
    let lastName = user.lastName;
    let userName = user.userName;
    
    let newPost = new Post({
      name,
      lastName,
      userName,
      textOfThePost,
   
    });

    console.log(newPost.json);
    await newPost.save();

    res.json("Post is created, congratulations!");
  } catch (error) {
    console.error("mad5alch");
    return res.status(500).json("Server Error...");
  }
};
