const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");

router.use("/dashboard", adminController.dashboard);
router.use("/", adminController.index);

module.exports = router;
