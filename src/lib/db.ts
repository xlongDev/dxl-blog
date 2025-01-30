import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("请在 Vercel 环境变量中设置 MONGODB_URI");
}

let cached: { conn: typeof mongoose | null } = { conn: null };

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
      retryWrites: true,
      w: 1,
    };

    const conn = await mongoose.connect(MONGODB_URI as string, opts);
    console.log("MongoDB Atlas 连接成功");
    cached.conn = conn;
    return conn;
  } catch (error) {
    console.error("MongoDB Atlas 连接失败:", error);
    throw error;
  }
}

export default connectDB;
