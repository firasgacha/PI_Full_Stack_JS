const router = require("express").Router();
const chatController = require("../controllers/chat.controller");

router.get("/user/:idUser", chatController.getChatsByUserId);
router.get("/:id", chatController.getChatByID);
router.post("/", chatController.createChat);
router.post("/store/", chatController.createChatFromStore);

module.exports = router;
