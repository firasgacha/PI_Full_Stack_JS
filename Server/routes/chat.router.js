const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.get("/:idUser", chatController.getChatsByUserId);
router.get("/:id", chatController.getChatByID);
router.post("/", chatController.createChat);

module.exports = router;
