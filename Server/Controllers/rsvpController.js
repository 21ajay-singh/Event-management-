const Event = require("../models/Event");

exports.joinEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate(
    {
      _id: req.params.id,
      capacity: { $gt: 0 },
      attendees: { $ne: req.user.id }
    },
    {
      $addToSet: { attendees: req.user.id },
      $inc: { capacity: -1 }
    },
    { new: true }
  );

  if (!event)
    return res.status(400).json({ message: "Event full or already joined" });

  res.json(event);
};

exports.leaveEvent = async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, {
    $pull: { attendees: req.user.id },
    $inc: { capacity: 1 }
  });

  res.json({ message: "Left event" });
};
