import Database, { Database as DatabaseType } from 'better-sqlite3';

let db: DatabaseType | null = null;

export const initDatabase = () => {
  if (!db) {
    db = new Database('pogs.db', {
      // Set the verbose option to see the SQL queries in the console
      verbose: console.log,
    });

    // Create the "pogs" table
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS pogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        ticker_symbol TEXT NOT NULL UNIQUE,
        price REAL NOT NULL,
        color TEXT NOT NULL
      )
    `
    ).run();

    // Create the "users" table
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE,
        balance REAL NOT NULL DEFAULT 0
      )
    `
    ).run();
  }

  return db;
};

export default initDatabase;
