const { validationResult } = require("express-validator");
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
