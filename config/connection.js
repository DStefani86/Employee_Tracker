import "dotenv/config";
import mysql from "mysql2";

const db = mysql.createConnection({
    host:"localhost",
    user:process.env.db_user,
    password: process.env.db_pw,
    database: process.env.db_name
});

export default db;