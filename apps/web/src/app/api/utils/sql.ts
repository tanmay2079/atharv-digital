import { getDb } from './db';

export { getDb };

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const db = getDb();
  if (params) {
    return db.prepare(sql).all(...params) as T[];
  }
  return db.prepare(sql).all() as T[];
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | undefined> {
  const db = getDb();
  if (params) {
    return db.prepare(sql).get(...params) as T | undefined;
  }
  return db.prepare(sql).get() as T | undefined;
}

export async function execute(sql: string, params?: any[]): Promise<{ changes: number; lastInsertRowid: number | bigint }> {
  const db = getDb();
  const stmt = db.prepare(sql);
  if (params) {
    const result = stmt.run(...params);
    return { changes: result.changes, lastInsertRowid: result.lastInsertRowid };
  }
  const result = stmt.run();
  return { changes: result.changes, lastInsertRowid: result.lastInsertRowid };
}

const sql = {
  query,
  queryOne,
  execute,
};

export default sql;
