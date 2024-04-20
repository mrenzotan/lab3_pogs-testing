import initDatabase from '@/db/database';

const db = initDatabase();

export const createUser = (user: {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  balance?: number;
}) => {
  const { name, email, password, isAdmin = false, balance = 0 } = user;
  const stmt = db.prepare(
    'INSERT INTO users (name, email, password, is_admin, balance) VALUES (?, ?, ?, ?, ?)'
  );
  const info = stmt.run(name, email, password, isAdmin, balance);
  return { id: info.lastInsertRowid, name, email, isAdmin, balance };
};

export const getUserByEmail = (email: string) => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
};

export const updateUser = (user: {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  balance: number;
}) => {
  const { id, name, email, password, isAdmin, balance } = user;
  const stmt = db.prepare(
    'UPDATE users SET name = ?, email = ?, password = ?, is_admin = ?, balance = ? WHERE id = ?'
  );
  stmt.run(name, email, password, isAdmin, balance, id);
  return user;
};

export const deleteUser = (id: number) => {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run(id);
};
