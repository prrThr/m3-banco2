const express = require("express");
const router = express.Router();
const controllerCreate = require("../controllers/create");
const controllerSelect = require("../controllers/select");
const controllerOthers = require("../controllers/others");
const transferData = require("../controllers/transferData");
const transfer = require("../controllers/transferDataOld");

const query = "SELECT * FROM departments";
const insertQuery = "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?) IF NOT EXISTS";
const params = ["dept_no", "dept_name"];


router.get("/get_employees", (req, res) => controllerSelect.selectEmployees(req, res, req.cassandraClient));
router.get("/get_departments", (req, res) => controllerSelect.selectDepartments(req, res, req.cassandraClient));

router.get("/create-employees-table", controllerCreate.createEmployeesTable);
router.get("/create-departments-table", controllerCreate.createDepartmentsTable);

router.get("/quit", controllerOthers.quit);

// Certifique-se de que a função transferData aceite req e res como parâmetros
router.post("/transfer-data", (req, res) => transfer.transferData(req, res, req.cassandraClient,"departments", query, insertQuery, params));


module.exports = router;
