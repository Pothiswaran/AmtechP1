import * as sql from 'mssql';

let pool: sql.ConnectionPool;

export async function getDbPool(): Promise<sql.ConnectionPool> {
  if (pool) return pool;

  pool = await sql.connect({
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASS || 'Welcome1',
    database: process.env.DB_NAME || 'HeadlessCMS',
    server: process.env.DB_HOST || 'LAPTOP-MT85AATK',
    port: parseInt(process.env.DB_PORT || '1433'),
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  });

  return pool;
}
