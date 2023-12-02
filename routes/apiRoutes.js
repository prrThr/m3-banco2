const express = require("express");
const router = express.Router();
const controllerCreate = require("../controllers/create");
const controllerSelect = require("../controllers/select");
const controllerOthers = require("../controllers/others");
const transfer = require("../controllers/transferData");

const tables = require("../sql/tables");


router.get("/get_employees", (req, res) => controllerSelect.selectEmployees(req, res, req.cassandraClient));
router.get("/get_departments", (req, res) => controllerSelect.selectDepartments(req, res, req.cassandraClient));

router.get("/create-employees-table", controllerCreate.createEmployeesTable);
router.get("/create-departments-table", controllerCreate.createDepartmentsTable);

router.get("/quit", controllerOthers.quit);

router.post("/transfer-data", (req, res) => transfer.transferData(req, res, req.cassandraClient, tables));


module.exports = router;
