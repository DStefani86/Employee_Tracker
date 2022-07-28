const questions = [
    {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add employee", "Update Employee Role"],
    },
    {
        type: 'input',
        name: 'department',
        message: 'Which department would you like to add?',
        when: ({selection}) => selection == 'Add Department'
    },
    {
        type: 'input',
        name: 'role',
        message: 'Which role would you like to add?',
        when: ({selection}) => selection == 'Add Role'
    },
    {
        type: 'input',
        name: 'department',
        message: 'Which department would you like to add?',
        when: ({selection}) => selection == 'Add employee',
    },
]
export default questions;