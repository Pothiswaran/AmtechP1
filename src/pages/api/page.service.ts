import * as sql from 'mssql';
import { getDbPool } from 'src/config/db';
import { Page } from 'src/models/page.model';


export async function getPageByPath(path: string): Promise<Page | null> {
  const pool = await getDbPool();

  const result = await pool
    .request()
    .input('path', sql.NVarChar(255), path)
    .query('SELECT * FROM Pages WHERE RequestPath = @path');

  if (result.recordset.length === 0) return null;

  return result.recordset[0];
}
