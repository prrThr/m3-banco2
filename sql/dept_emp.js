const createTableQuery = `
CREATE TABLE IF NOT EXISTS dept_emp (
  emp_no INT PRIMARY KEY,
  dept_no TEXT,
  from_date DATE,
  to_date DATE
);
`;

module.exports = {
    query,
    insertQuery,
    params,
    createTableQuery
}