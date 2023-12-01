const express = require("express");
const router = express.Router();
const controller = require("../controllers/Controller");

router.get("/get_employees", controller.selectEmployees);
router.get("/get_departments", controller.selectDepartments);
router.get("/quit", controller.quit);

module.exports = router;