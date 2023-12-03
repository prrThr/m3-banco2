const express = require("express");
const router = express.Router();

const select = require("../controllers/select");
const quit = require("../controllers/quit");
const sync = require("../controllers/sync");
const queries = require("../controllers/queries");

const tablesQueries = require("../sql/tables");

// ---------------------------------------------------------------- //

router.get("/get_employees", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "employees")
);
router.get("/get_departments", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "departments")
);
router.get("/get_dept_emp", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "dept_emp")
);
router.get("/get_dept_manager", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "dept_manager")
);
router.get("/get_salaries", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "salaries")
);
router.get("/get_titles", (req, res) =>
  select.selectAll(req, res, req.cassandraClient, "titles")
);

// ---------------------------------------------------------------- //

router.get("/employees_by_manager", (req, res) => {
  select.employeesByManager(req, res, req.cassandraClient)
});

router.get("/employees_by_department", (req, res) => {
  select.selectAll(req, res, req.cassandraClient, "employees_by_department")
});

router.get("/average_salary", (req, res) =>
  queries.averageSalary(req, res, req.cassandraClient)
);
// ...


// ---------------------------------------------------------------- //

router.post("/sync-data", (req, res) =>
  sync.syncData(req, res, req.cassandraClient, tablesQueries.tables)
);
router.get("/quit", quit.quit);

module.exports = router;
