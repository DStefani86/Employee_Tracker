drop database if exists employees_db;
create database employees_db;
use employees_db;

create table departments (
    id int primary key auto_increment,
    name VARCHAR(30) unique not null
    );

create table role (
    id int primary key auto_increment,
    title VARCHAR(30) unique not null,
    salary decimal(10,2),
    department_id int,
    foreign key(department_id) references departments(id)
    );

create table employees (
    id int primary key auto_increment,
    firstName VARCHAR(30) unique not null,
    lastName VARCHAR(30) unique not null,
    role_id int,
    manager_id int,
    foreign key(role_id) references role(id),
    foreign key(manager_id) references employees(id)
    );





