const createTableQuery = `
CREATE TABLE IF NOT EXISTS dept_manager (
  dept_no INT,
  emp_no INT PRIMARY KEY,
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