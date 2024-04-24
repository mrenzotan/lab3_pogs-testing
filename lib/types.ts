export type Pog = {
  id?: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  balance: number;
  ownedPogs: number[];
};