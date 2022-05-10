const router = require("express").Router();
const storeController = require("../controllers/storeController");
const auth = require("../middleware/auth");

router.get("/", storeController.getStore);
router.get("/:id", storeController.getOneStore);
router.get("/owner/:owner", storeController.getStoreByUser);
router.post("/", storeController.addStore);
router.patch("/:id", storeController.updateStore);
router.patch("/verify/:id", storeController.verifyStore);
router.delete("/:id", storeController.deleteStore);

module.exports = router;
