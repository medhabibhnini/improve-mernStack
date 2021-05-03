const { validationResult } = require("express-validator");
const event = require("../models/eventModel");

module.exports = async (req, res) => {
  

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    
    let newEvent = new event({
      nameEvent = req.body.nameEvent,
      description = req.body.description,
      avatar = req.body.avatar
   
    });

    console.log(newEvent.json);
    await newEvent.save();

    res.json("Event is created, congratulations!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Servjhjher Error ...");
  }
};
