const express = require("express");
const router = express.Router();

const {
  createInventory,
  getInventory,
  getGroupedInventory
} = require("../controllers/inventoryController");

router.post("/", createInventory);
router.get("/", getInventory);
router.get("/grouped", getGroupedInventory);

module.exports = router;