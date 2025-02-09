import mysql from "mysql2/promise";

if (!process.env.MYSQL_HOST) {
  throw new Error("请在环境变量中设置 MYSQL_HOST");
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const promisePool = pool;
