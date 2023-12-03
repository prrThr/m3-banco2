const tables = [
  {
    tableName: "employees_and_manager",
    createTable: `
        CREATE TABLE IF NOT EXISTS employees_and_manager (
          emp_no INT PRIMARY KEY,
          birth_date DATE,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          hire_date DATE,
          dept_no TEXT,
          dept_name TEXT
        );
        `,
    tableQuery: `select emp.*, dept_emp.dept_no, dep.dept_name from employees emp left join dept_emp dept_emp on emp.emp_no = dept_emp.emp_no left join departments dep on dep.dept_no = dept_emp.dept_no
    `,
    insertQuery:
      "INSERT INTO employees_and_manager (emp_no, birth_date, first_name, last_name, gender, hire_date, dept_no, dept_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    createIndex: "CREATE INDEX ON employees_and_manager (dept_no);",
    tableParams: [
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "dept_no",
      "dept_name"
    ],
  },

  // --------------------------------------------------------------------------------------------------------- //
];

module.exports = {
  tables,
};
