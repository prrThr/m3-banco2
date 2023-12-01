const query = "SELECT * FROM departments";
const insertQuery = "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?) IF NOT EXISTS";
const params = ["dept_no", "dept_name"];
const createTableQuery = `
CREATE TABLE IF NOT EXISTS departments (
  dept_no TEXT PRIMARY KEY,
  dept_name TEXT
);
`;

module.exports = {
    query,
    insertQuery,
    params,
    createTableQuery
}