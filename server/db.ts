// Database configuration - adapted for Replit environment
import { createConnection } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '@shared/schema';
import 'dotenv/config';

let connection: any = null;
let db: any = null;

export async function getDb() {
  if (!db) {
    try {
      // Try to connect to database if environment variables are available
      if (process.env.MYSQL_HOST && process.env.MYSQL_HOST !== 'db') {
        connection = await createConnection({
          host: process.env.MYSQL_HOST,
          port: parseInt(process.env.MYSQL_PORT || '3306'),
          user: process.env.MYSQL_USER || 'root',
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        });
        
        db = drizzle(connection, {
          schema,
          mode: 'default',
        });
      }
    } catch (error) {
      console.log('Database connection failed, using in-memory storage');
      db = null;
    }
  }
  return db;
}

// For backward compatibility - will be null if no database available
export { db };
