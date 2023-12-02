const express = require("express");
const router = express.Router();
const controllerCreate = require("../controllers/create");
const controllerSelect = require("../controllers/select");
const controllerOthers = require("../controllers/others");
const transfer = require("../controllers/transferData");

const queries = require("../sql/tables");


router.get("/get_employees", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "employees"));
router.get("/get_departments", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "departments"));
router.get("/get_dept_emp", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "dept_emp"));
router.get("/get_dept_manager", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "dept_manager"));
router.get("/get_salaries", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "salaries"));
router.get("/get_titles", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "titles"));

router.get("/create-employees-table", controllerCreate.createEmployeesTable);
router.get("/create-departments-table", controllerCreate.createDepartmentsTable);

router.get("/quit", controllerOthers.quit);

router.post("/transfer-data", (req, res) => transfer.transferData(req, res, req.cassandraClient, queries.tables));


module.exports = router;
