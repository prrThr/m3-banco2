const tables = [
  {
    tableName: "departments",
    createTable: `CREATE TABLE IF NOT EXISTS departments (
            dept_no TEXT PRIMARY KEY,
            dept_name TEXT
          );`,
    tableQuery: "SELECT * FROM departments",
    insertQuery:
      "INSERT INTO departments (dept_no, dept_name) VALUES (?, ?) IF NOT EXISTS",
    tableParams: ["dept_no", "dept_name"],
  },
  
  // --------------------------------------------------------------------------------------------------------- //
  
  {
    tableName: "employees",
    createTable: `
        CREATE TABLE IF NOT EXISTS employees (
          emp_no INT PRIMARY KEY,
          birth_date DATE,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          hire_date DATE
        );
        `,
    tableQuery: "SELECT * FROM employees ORDER BY emp_no LIMIT 100",
    insertQuery:
      "INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?, ?, ?, ?, ?, ?)",
    tableParams: [
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
    ],
  },

  // --------------------------------------------------------------------------------------------------------- //
  
  {
    tableName: "dept_emp",
    createTable: `CREATE TABLE IF NOT EXISTS dept_emp (
            emp_no INT PRIMARY KEY,
            dept_no TEXT,
            from_date DATE,
            to_date DATE
          );
          `,
    tableQuery: "SELECT * FROM dept_emp ORDER BY emp_no",
    insertQuery:
      "INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (?, ?, ?, ?)",
    tableParams: ["emp_no", "dept_no", "from_date", "to_date"],
  },

  // --------------------------------------------------------------------------------------------------------- //

  {
    tableName: "dept_manager",
    createTable: `
        CREATE TABLE IF NOT EXISTS dept_manager (
          dept_no INT,
          emp_no INT PRIMARY KEY,
          from_date DATE,
          to_date DATE
        );
        `,
    tableQuery: "SELECT * FROM dept_manager ORDER BY emp_no",
    insertQuery:
      "INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (?, ?, ?, ?)",
    tableParams: ["emp_no", "dept_no", "from_date", "to_date"],
  },

  // --------------------------------------------------------------------------------------------------------- //

  {
    tableName: "salaries",
    createTable: `
        CREATE TABLE IF NOT EXISTS salaries (
          emp_no INT PRIMARY KEY,
          salary INT,
          from_date DATE,
          to_date DATE
        );
        `,
    tableQuery: "SELECT * FROM salaries ORDER BY emp_no LIMIT 100",
    insertQuery:
      "INSERT INTO salaries (emp_no, from_date, salary, to_date) VALUES (?, ?, ?, ?)",
    tableParams: ["emp_no", "from_date", "salary", "to_date"],
  },

  // --------------------------------------------------------------------------------------------------------- //

  {
    tableName: "titles",
    createTable: `
        CREATE TABLE IF NOT EXISTS titles (
          emp_no INT PRIMARY KEY,
          title TEXT,
          from_date DATE,
          to_date DATE
        );
        `,
    tableQuery: "SELECT * FROM titles ORDER BY emp_no LIMIT 100",
    insertQuery:
      "INSERT INTO titles (emp_no, from_date, title, to_date) VALUES (?, ?, ?, ?)",
    tableParams: ["emp_no", "from_date", "title", "to_date"],
  }
];

modules.export = {
    tables
}