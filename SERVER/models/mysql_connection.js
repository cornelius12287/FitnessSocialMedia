const mysql =   require('mysql');
                require('dotenv').load();
                
const util = require('util');

const conn = mysql.createPool({
    host: process.env.MYSQL_HOST || 'wyvern.cs.newpaltz.edu',
    user: process.env.MYSQL_USER || 'n02360837',
    password: process.env.MYSQL_PASS || 'u5sffy',
    database: process.env.MYSQL_DB || 'n02360837_db',
    connectionLimit: 10,
    insecureAuth: true
});

conn.query = util.promisify(conn.query);

module.exports = conn;