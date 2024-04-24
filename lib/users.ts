import prisma from '@/lib/prisma';

// export const createUser = async (user: {
//   name: string;
//   email: string;
//   isAdmin?: boolean;
//   balance?: number;
// }) => {
//   const { name, email, isAdmin = false, balance = 0 } = user;
//   const createdUser = await prisma.user.create({
//     data: { name, email, isAdmin, balance },
//   });
//   return createdUser;
// };

// export const getUserByEmail = (email: string) => {
//   const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
//   return stmt.get(email);
// };

// export const updateUser = (user: {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
//   balance: number;
// }) => {
//   const { id, name, email, password, isAdmin, balance } = user;
//   const stmt = db.prepare(
//     'UPDATE users SET name = ?, email = ?, password = ?, is_admin = ?, balance = ? WHERE id = ?'
//   );
//   stmt.run(name, email, password, isAdmin, balance, id);
//   return user;
// };

// export const deleteUser = (id: number) => {
//   const stmt = db.prepare('DELETE FROM users WHERE id = ?');
//   stmt.run(id);
// };

export const readUser = (id: number) => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

export const updateUserBalance = (user: User) => {
  const { id, balance } = user;
  const stmt = db.prepare('UPDATE users SET balance = ? WHERE id = ?');
  stmt.run(balance, id);
  return user;
};