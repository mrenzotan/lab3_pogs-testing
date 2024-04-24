import initDatabase from '@/db/database';
import { Pog } from './types';

const db = initDatabase();

export const readPogs = () => {
  return db.prepare('SELECT * FROM pogs').all();
};

export const readPog = (id: number): Pog => {
  return db.prepare('SELECT * FROM pogs WHERE id = ?').get(id) as Pog;
};

export const createPog = (pog: Pog) => {
  const { name, ticker_symbol, price, color } = pog;
  const stmt = db.prepare(
    'INSERT INTO pogs (name, ticker_symbol, price, color) VALUES (?, ?, ?, ?)'
  );
  const info = stmt.run(name, ticker_symbol, price, color);
  return { id: info.lastInsertRowid, name, ticker_symbol, price, color };
};

export const updatePog = (pog: Pog) => {
  const { id, name, ticker_symbol, price, color } = pog;
  const stmt = db.prepare(
    'UPDATE pogs SET name = ?, ticker_symbol = ?, price = ?, color = ? WHERE id = ?'
  );
  stmt.run(name, ticker_symbol, price, color, id);
  return pog;
};

export const deletePog = (id: number) => {
  const stmt = db.prepare('DELETE FROM pogs WHERE id = ?');
  stmt.run(id);
};
