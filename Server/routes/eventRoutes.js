const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { createEvent, getEvents, deleteEvent } = require("../Controllers/eventController");

router.post("/", auth, upload.single("image"), createEvent);
router.get("/", getEvents);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
