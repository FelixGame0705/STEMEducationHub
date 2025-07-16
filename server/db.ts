// src/lib/db.ts (hoặc wherever you place it)
import { createConnection } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '@shared/schema'; // Đảm bảo đường dẫn này đúng với file schema.ts
import 'dotenv/config'; // Đảm bảo env được load nếu gọi từ CLI hoặc không dùng Next.js runtime

const connection = await createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE || 'stem_center',
});

export const db = drizzle(connection, {
  schema,
  mode: 'default', // hoặc 'planetscale' nếu bạn dùng Planetscale
});
