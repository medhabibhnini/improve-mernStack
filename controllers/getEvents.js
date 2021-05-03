const event = require("../../models/eventModel");

module.exports = async (req, res) => {
  try {
    let events = await event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};