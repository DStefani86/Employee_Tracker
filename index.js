import inquirer from "inquirer";
import questions from "./src/questions.js";
import db from "./config/connection.js";
const cTable = import("console.table");

const init = () => {
  inquirer.prompt(questions).then((a) => {
    if (a.selection === "View Departments") showDepartments().then(init);
    if (a.selection === "View Roles") showRole().then(init);
    if (a.selection === "View Employees") showEmp().then(init);
    if (a.selection === "Add Department") addDepart(a.department);
    if (a.selection === "Add Role") addRole(a.title, a.salary);
    if (a.selection === "Add Employee") addEmp(a.firstName,a.lastName);
    if (a.selection === "Update Employee Role")updateRole(a.id,a.role_id);
  });
};

const showDepartments = async () => {
  let data = await db.promise().query("select * from departments");
  console.table(data[0]);
};

const showRole = async () => {
  let data = await db.promise().query("select * from role");
  console.table(data[0]);
};

const showEmp = async () => {
  let data = await db.promise().query("select * from employees");
  console.table(data[0]);
};

const addDepart = async (department) => {
  let data = await db
    .promise()
    .query(`INSERT INTO departments (name) VALUES ("${department}")`)
    .then(init);
};

const addRole = async (title, salary) => {
  let departments = await db
    .promise()
    .query("SELECT name, id AS value FROM departments");
  inquirer
    .prompt([
      {
        type: "list",
        name: "department_id",
        message: "What is the department?",
        choices: departments[0],
      },
    ])
    .then(async ({ department_id }) => {
      await db
        .promise()
        .query(
          `INSERT INTO role (title,salary,department_id) VALUES ("${title}", ${salary},${department_id})`
        );
    })
    .then(init);
};

const addEmp = async (firstName, lastName) => {
  let roles = await db
    .promise()
    .query("SELECT title AS name, id AS value FROM role");

  let managers = await db
    .promise()
    .query(
      "SELECT CONCAT(firstName,' ',lastName) as name, id AS value FROM employees"
    );

  inquirer
    .prompt([
      {
        type: "list",
        name: "role_id",
        message: "What is the role?",
        choices: roles[0],
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the manager?",
        choices: managers[0],
      },
    ])
    .then(async ({ role_id, manager_id }) => {
      await db
        .promise()
        .query(
          `INSERT INTO employees (firstName,lastName,role_id,manager_id) VALUES ("${firstName}", "${lastName}", "${role_id}", "${manager_id}")`
        )
        .then(init);
    });
};

const updateRole = async (firstName, lastName) => {
  let roles = await db
  .promise()
  .query("SELECT title AS name, id AS value FROM role");

  let employees = await db
    .promise()
    .query(
      "SELECT CONCAT(firstName,' ',lastName) as name, id AS value FROM employees"
    );

  inquirer
    .prompt([ 
       {
        type: "list",
        name: "id",
        message: "Which employee would you like to update?",
        choices: employees[0],
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role?",
        choices: roles[0],
      },
    
    ])
    .then(async ({ role_id, manager_id }) => {
      await db
        .promise()
        .query(
          `UPDATE employees (firstName,lastName,id,role_id) VALUES ("${firstName}", "${lastName}", "${role_id}")`
        )
        .then(init);
    });
};

init();
