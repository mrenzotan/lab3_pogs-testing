import initDatabase from '@/db/database';

const db = initDatabase();

export const readPogs = () => {
  return db.prepare('SELECT * FROM pogs').all();
};

export const createPog = (pog: {
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}) => {
  const { name, ticker_symbol, price, color } = pog;
  const stmt = db.prepare(
    'INSERT INTO pogs (name, ticker_symbol, price, color) VALUES (?, ?, ?, ?)'
  );
  const info = stmt.run(name, ticker_symbol, price, color);
  return { id: info.lastInsertRowid, name, ticker_symbol, price, color };
};

export const updatePog = (pog: {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}) => {
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
