import prisma from '@/lib/prisma';
import { Pog } from './types';

export const readPogs = async () => {
  return await prisma.pog.findMany();
};

export const readSpecificPog = async (id: number) => {
  return await prisma.pog.findUnique({
    where: {
      id: id
    }
  })
}

export const createPog = async (pog: Pog) => {
  const { name, ticker_symbol, price, color } = pog;
  const createdPog = await prisma.pog.create({
    data: { name, ticker_symbol, price, color },
  });
  return createdPog;
};

export const updatePog = async (pog: Pog) => {
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
