const router = require("express").Router();
const storeController = require("../controllers/storeController");
const auth = require("../middleware/auth");

router.get("/", storeController.getStore);
router.get("/:id", storeController.getOneStore);
router.get("/owner/:owner", storeController.getStoreByUser);
router.post("/", auth, storeController.addStore);
router.patch("/:id", auth, storeController.updateStore);
router.delete("/:id", auth, storeController.deleteStore);

module.exports = router;
