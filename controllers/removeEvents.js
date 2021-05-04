const event = require("../../models/eventModel");

module.exports = async (req, res) => {
  try {
    let eventRemove = await event.findById(req.params.event_id);

    if (!eventRemove) return res.status(404).json("Event not found");

    await eventRemove.remove();

    res.json("Event is removed!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
