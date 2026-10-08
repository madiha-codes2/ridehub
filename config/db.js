const mysql = require("mysql2");

require("dotenv").config();


const db = mysql
    .createPool({

        host: process.env.DB_HOST,

        user: process.env.DB_USER,

        password: process.env.DB_PASSWORD,

        database: process.env.DB_NAME,

        waitForConnections: true,

        connectionLimit: 10,

        queueLimit: 0

    })
    .promise();


/* =====================================================
   TEST DATABASE CONNECTION
===================================================== */

db.getConnection()

    .then((connection) => {

        console.log(
            "MySQL database connected successfully"
        );

        connection.release();

    })

    .catch((error) => {

        console.error(
            "Database connection failed:",
            error.message
        );

    });


module.exports = db;