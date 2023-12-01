const createTableQuery = `
CREATE TABLE IF NOT EXISTS salaries (
  emp_no INT PRIMARY KEY,
  salary INT,
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