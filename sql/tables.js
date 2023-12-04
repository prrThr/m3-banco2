const tables = [
  {
    tableName: "employees",
    createTable: `
        CREATE TABLE IF NOT EXISTS employees (
          emp_no INT PRIMARY KEY,
          birth_date DATE,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          hire_date DATE,
          dept_no TEXT,
          dept_name TEXT,
          from_date DATE,
          to_date DATE
        );
        `,
    sqlQuery: `
      SELECT emp.*, dept_emp.dept_no, dep.dept_name, dept_emp.from_date, dept_emp.to_date from employees as emp 
        LEFT JOIN dept_emp dept_emp 
          ON emp.emp_no = dept_emp.emp_no 
        LEFT JOIN departments dep 
          ON dep.dept_no = dept_emp.dept_no
          LIMIT 500;
      `,
    insertQuery:
      `
      INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date, dept_no, dept_name, from_date, to_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
    tableParams: [
      "emp_no",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
      "hire_date",
      "dept_no",
      "dept_name",
      "from_date",
      "to_date"
    ],
  },
  {
    tableName: "employees_salaries",
    createTable: `
    CREATE TABLE IF NOT EXISTS employees_salaries (
      emp_no INT,
      first_name TEXT,
      last_name TEXT,
      dept_no TEXT,
      salary INT,
      PRIMARY KEY (emp_no, dept_no)
    );
    `,
    sqlQuery: `
    SELECT emp.emp_no, emp.first_name, emp.last_name, sal.salary, dept_emp.dept_no from employees as emp 
      LEFT JOIN dept_emp dept_emp 
        ON emp.emp_no = dept_emp.emp_no 
      LEFT JOIN departments dep 
        ON dep.dept_no = dept_emp.dept_no
      LEFT JOIN
        salaries sal ON sal.emp_no = emp.emp_no
        LIMIT 200;
    `,
    insertQuery: `
    INSERT INTO employees_salaries (emp_no, first_name, last_name, salary, dept_no)
      VALUES (?, ?, ?, ?, ?);
    `,
    tableParams: [
      "emp_no",
      "first_name",
      "last_name",
      "salary",
      "dept_no"
    ]
  }

];

module.exports = {
  tables,
};
