import prisma from '@/lib/prisma';

export const readPogs = async () => {
  return await prisma.pogs.findMany();
};

export const createPog = async (pog: {
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}) => {
  try {
    const { name, ticker_symbol, price, color } = pog;
    const createdPog = await prisma.pogs.create({
      data: { name, ticker_symbol, price, color },
    });
    return createdPog;
  } catch (error) {
    console.error('Error creating Pog:', error);
    return { status: 500, json: { error: 'Failed to create Pog' } };
  }
};

export const updatePog = async (pog: {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}) => {
  const { id, name, ticker_symbol, price, color } = pog;
  const updatedPog = await prisma.pogs.update({
    where: { id },
    data: { name, ticker_symbol, price, color },
  });
  return updatedPog;
};

export const deletePog = async (id: number) => {
  await prisma.pogs.delete({ where: { id } });
};
