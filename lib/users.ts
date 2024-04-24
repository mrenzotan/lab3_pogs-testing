import prisma from '@/lib/prisma';

export const readUser = async () => {
  return await prisma.user.findMany()
}

export const readSpecificUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id }
  })
}

export const updateUserBalance = async (id: string, newBalance: number) => {
  try {
    const updatedBalance = await prisma.user.update({
      where: { id },
      data: { balance: newBalance },
    })
    return updatedBalance
  } catch (error) {
    console.error('Error updating user balance:', error)
    throw error
  }
}

export const updateUserPogs = async (id: string, pogID: number, operation: 'buy' | 'sell') => {
  try {
    const updatedPogs = await prisma.user.update({
      where: { id },
      data: {
        ownedPogs: operation === 'buy'
          ? { push: pogID }
          : { filter: { id: { notIn: [pogID] } } }
      },
    })
    return updatedPogs
  } catch (error) {
    console.error('Error updating user pogs:', error)
    throw error
  }
}

export const readUser = (id: number) => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

// export const updateUser = (user: User) => {
//   const { id, name, email, isAdmin, balance } = user;
//   const stmt = db.prepare(
//     'UPDATE users SET name = ?, email = ?, is_admin = ?, balance = ? WHERE id = ?'
//   );
//   stmt.run(name, email, isAdmin, balance, id);
//   return user;
// };

// export const deleteUser = (id: number) => {
//   const stmt = db.prepare('DELETE FROM users WHERE id = ?');
//   stmt.run(id);
// };

export const updateUserBalance = (user: User) => {
  const { id, balance } = user;
  const stmt = db.prepare('UPDATE users SET balance = ? WHERE id = ?');
  stmt.run(balance, id);
  return user;
};

export const updateUserPogs = (user: User) => {
  const { id, ownedPogs } = user;
  const stmt = db.prepare('UPDATE users SET ownedPogs = ? WHERE id = ?');
  stmt.run(ownedPogs, id);
  return user;
};