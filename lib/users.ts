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
