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

const addDepart = async department => {
    let data = await db.promise().query(`INSERT INTO departments (name) VALUES ("${department}")`);
    console.table(data[0]);

}

init();
