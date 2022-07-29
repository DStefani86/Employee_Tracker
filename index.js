import inquirer from "inquirer";
import questions from "./src/questions.js";
import db from "./config/connection.js";
const cTable = import("console.table");

const init = () => {
  inquirer.prompt(questions).then((ans) => {
    if (ans.selection == "View Departments") showDepartments().then(init);
    if (ans.selection == "View Roles") showRole().then(init);
    if (ans.selection == "View Employees") showEmp().then(init);
    if (ans.selection == "Add Department") addDepart(ans.department).then(init);
    if (ans.selection == "Add Role") addRole(ans.title, ans.salary);
    if (ans.selection == "Add Employee") addEmp(ans.firstName, ans.lastName, ans.department_id).then(init); 
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
    // console.log(choices)
  inquirer
    .prompt([
      {
        type: "list",
        name: "department_id",
        message: "What is the role?",
        choices: choices,
      },
    ])
    .then(async ({ department_id }) => {
      // console.log(department_id)
      let depId = await db
        .promise()
        .query(`SELECT * FROM role WHERE title = '${department_id}'`) 
        .then(init);
 console.log(depId)
    })
    await db
    .promise()
    .query(`INSERT INTO employees (firstName, lastName, department_id) VALUES ("${firstName}", "${lastName}", ${depId})`)
};

init();
 


