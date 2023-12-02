const express = require("express");
const router = express.Router();

const controllerSelect = require("../controllers/select");
const controllerQuit = require("../controllers/quit");
const transfer = require("../controllers/transferData");

const queries = require("../sql/tables");


router.get("/get_employees", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "employees"));
router.get("/get_departments", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "departments"));
router.get("/get_dept_emp", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "dept_emp"));
router.get("/get_dept_manager", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "dept_manager"));
router.get("/get_salaries", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "salaries"));
router.get("/get_titles", (req, res) => controllerSelect.selectAll(req, res, req.cassandraClient, "titles"));

router.post("/transfer-data", (req, res) => transfer.transferData(req, res, req.cassandraClient, queries.tables));

router.get("/quit", controllerQuit.quit);

module.exports = router;
