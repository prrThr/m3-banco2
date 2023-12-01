const query = `SELECT * FROM employees ORDER BY emp_no LIMIT 100`;
const insertQuery = "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)";
const params = [
  "emp_no",
  "birth_date",
  "first_name",
  "last_name",
  "gender",
  "hire_date",
];

const createTableQuery = `
CREATE TABLE IF NOT EXISTS employees (
  emp_no INT PRIMARY KEY,
  birth_date DATE,
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  hire_date DATE
);
`;

module.exports = {
    query,
    insertQuery,
    params,
    createTableQuery
}