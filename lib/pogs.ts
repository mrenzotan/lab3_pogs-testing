import prisma from '@/lib/prisma';

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
  const createdPog = await prisma.pog.create({
    data: { name, ticker_symbol, price, color },
  });
  return createPog;
};

export const updatePog = async (pog: {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}) => {
  const { id, name, ticker_symbol, price, color } = pog;
  const updatedPog = await prisma.pog.update({
    where: { id },
    data: { name, ticker_symbol, price, color },
  });
  return updatedPog;
};

export const deletePog = async (id: number) => {
  await prisma.pog.delete({ where: { id } });
};
