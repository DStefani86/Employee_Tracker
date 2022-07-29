import inquirer from "inquirer";
import questions from "./src/questions.js";
import db from "./config/connection.js";
const cTable = import("console.table");

const init = () => {
  inquirer.prompt(questions).then((answer) => {
    if (answer.start === 'View Departments') {
      showDepartments();
    } else if (answer.start === 'View Roles') {
      showRole();
    }
    else if (answer.start === "View Employees") showEmp();
    else if (answer.start === "Add Department") addDepart();
    else if (answer.start === "Add Role") addRole();
    else if (answer.start === "Add Employee") addEmp();
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
    .query(`INSERT INTO departments (name) VALUES ("${department}")`);
  console.table(data[0]);
};

const addRole = async (title, salary) => {
  console.log("data: ", title, salary);
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
        .query(`INSERT INTO role (title,salary,department_id) VALUES ("${title}", ${salary},${department_id})`);
    })
    .then(init);
};

const addEmp = async (firstName, lastName) => {
  console.log("data: ", firstName, lastName);
  let role = await db
    .promise()
    .query("SELECT title FROM role"); 
    console.log(role[0])
    var choices = []
    for (let i =0; i < role[0].length; i++){
        choices.push(role[0][i].title)
    }
    
  inquirer
    .prompt([
      {
        type: "list",
        name: "newRole",
        message: "What is the role?",
        choices: choices,
      },
    ])
    .then(async ({ department_id }) => {
      let depId = await db
        .promise()
        .query(`SELECT * FROM role WHERE title = '${department_id}'`)
    })
    await db
    .promise()
    .query(`INSERT INTO employees (firstName, lastName, department_id) VALUES ("${firstName}", "${lastName}", ${depId})`).then(init);
};

init();
 


