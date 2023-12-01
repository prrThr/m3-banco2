const createTableQuery = `
CREATE TABLE IF NOT EXISTS titles (
  emp_no INT PRIMARY KEY,
  title TEXT,
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