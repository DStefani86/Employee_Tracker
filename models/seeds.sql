insert into departments (name)


values 
    ('sales'),
    ('engineering'),
    ('marketing'),
    ('management');

insert into role (title, salary, department_id)
values 
    ('sales rep', 50000, 1),
    ('engineer', 110000, 2),
    ('consultant', 80000, 3),
    ('manager', 85000, 4);

insert into employees (firstName, lastName, role_id, manager_id)
values 
    ('Joe', 'Montana', 4, null),
    ('Michael', 'Jordan', 2, 1),
    ('John', 'Madden', 3, 2),
    ('Scottie', 'Pippen', 1, 1);




