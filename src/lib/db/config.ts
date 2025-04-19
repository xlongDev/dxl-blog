import mysql, {
  RowDataPacket,
  ResultSetHeader,
  FieldPacket,
} from "mysql2/promise";

if (!process.env.MYSQL_HOST) {
  throw new Error("请在环境变量中设置 MYSQL_HOST");
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,
  multipleStatements: false,
  dateStrings: true,
});

pool.on("connection", () => {
  console.log("新的数据库连接已建立");
});

pool.on("enqueue", () => {
  console.log("等待数据库连接中...");
});

pool.on("acquire", () => {
  console.log("数据库连接已从连接池获取");
});

pool.on("release", () => {
  console.log("数据库连接已释放回连接池");
});

export async function queryWithRetry<T extends RowDataPacket>(
  sql: string,
  values?: any[],
  retries = 3
): Promise<[T[], FieldPacket[]]> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await pool.query<T[]>(sql, values);
      return result;
    } catch (error: any) {
      if (i === retries - 1) throw error;

      if (error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED") {
        console.log(`查询失败，正在进行第 ${i + 1} 次重试...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      throw error;
    }
  }
  throw new Error("查询失败：超过最大重试次数");
}

export const promisePool = pool;
