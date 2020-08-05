// npm install --save mysql2
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database: 'shop',
    password: 'Luongvidu123'
});

module.exports = pool.promise();