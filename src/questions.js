import mysql2 from "mysql2"

const questions = [
  {
    type: "list",
    name: "selection",
    message: "What would you like to do?",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
    ],
  },
  {
    type: "input",
    name: "department",
    message: "Which department would you like to add?",
    when: ({ selection }) => selection == "Add Department",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of the position?",
    when: ({ selection }) => selection == "Add Role",
  },
  {
    type: "number",
    name: "salary",
    message: "What is the salary of the position?",
    when: ({ selection }) => selection == "Add Role",
  },
  {
  type: "input",
  name: "firstName",
  message: "What is employees First Name?",
  when: ({ selection }) => selection == "Add Employee",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is employees Last Name?",
    when: ({ selection }) => selection == "Add Employee",
    },
    {
        type: "list",
        name: "newMan",
        message: "Who is the manager?",
        choices: [
            "Joe Montana"
        ],
        when: ({ selection }) => selection == "Add Employee",
    },
    {
        type: "list",
        name: "newRole",
        message: "What is the position?",
        choices: [
            "Sales Rep",
            "Engineer",
            "Manager",
            "Consultant"
        ],
        when: ({ selection }) => selection == "Add Employee",
    },
]

//     when: ({selection}) => selection == 'Add employee',
// },
export default questions;
