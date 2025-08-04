const express = require("express");
const router = express.Router();
const owner = require("../controllers/OwnerController");

router.get("/menu", owner.getAllMenu);
router.post("/menu", owner.CreateMenu);
router.put("/menu/:id", owner.UpdateMenu);
router.delete("/menu/:id", owner.DeleteMenu);

module.exports = router;
