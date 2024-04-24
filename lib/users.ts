import initDatabase from '@/db/database';
import { User } from './types';

const db = initDatabase();

export const createUser = (user: User) => {
  const { name, email, isAdmin = false, balance = 0 } = user;
  const stmt = db.prepare(
    'INSERT INTO users (name, email, is_admin, balance) VALUES (?, ?, ?, ?, ?)'
  );
  const info = stmt.run(name, email, isAdmin, balance);
  return { id: info.lastInsertRowid, name, email, isAdmin, balance };
};

export const getUserByEmail = (email: string) => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
};

export const updateUser = (user: User) => {
  const { id, name, email, isAdmin, balance } = user;
  const stmt = db.prepare(
    'UPDATE users SET name = ?, email = ?, is_admin = ?, balance = ? WHERE id = ?'
  );
  stmt.run(name, email, isAdmin, balance, id);
  return user;
};

export const deleteUser = (id: number) => {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run(id);
};

export const readUser = (id: number) => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

export const updateUserBalance = (user: User) => {
  const { id, balance } = user;
  const stmt = db.prepare('UPDATE users SET balance = ? WHERE id = ?');
  stmt.run(balance, id);
  return user;
};