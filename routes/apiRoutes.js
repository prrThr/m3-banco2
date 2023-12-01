const express = require("express");
const router = express.Router();
const controllerCreate = require("../controllers/create")
const controllerSelect = require("../controllers/select")
const controllerOthers = require("../controllers/others")
const transferData = require("../controllers/transferData")

router.get("/get_employees", (req, res) => controllerSelect.selectEmployees(req, res, req.cassandraClient));
router.get("/get_departments", (req, res) => controllerSelect.selectDepartments(req, res, req.cassandraClient));

router.get("/create-employees-table", controllerCreate.createEmployeesTable);
router.get("/create-departments-table", controllerCreate.createDepartmentsTable);

router.get("/use-m3", controllerOthers.useM3);
router.get("/quit", controllerOthers.quit);

router.get("/transfer-data", transferData.transferData); // Nova rota para transferData

module.exports = router;
