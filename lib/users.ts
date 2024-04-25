import prisma from '@/lib/prisma';

export const createUser = async (userID: string, userName: string, userEmail: string) => {
  return await prisma.user.create({
    data: {
      id: userID,
      name: userName,
      email: userEmail,
      isAdmin: false,
      balance: 0,
      ownedPogs: []
    }
  })
}

export const existingUser = async (userID: string) => {
  return await prisma.user.findUnique({
    where: { id: userID }
  })
}

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
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    let updatedOwnedPogs: number[];
    if (operation === 'buy') {
      updatedOwnedPogs = [...user.ownedPogs, pogID];
    } else {
      updatedOwnedPogs = user.ownedPogs.filter((pog) => pog !== pogID);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ownedPogs: updatedOwnedPogs },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user pogs:', error);
    throw error;
  }
}