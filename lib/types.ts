export interface Props {
  children: React.ReactNode;
}

export interface PogCardProps {
  pog: Pog;
  onDeletePog: (id: number) => void;
  onEditPog: (id: number) => void;
  onGeneratePriceChange: (id: number, currentPrice: number) => void;
}

export interface PogsListProps {
  pogs: Pog[];
  onDeletePog: (id: number) => void;
  onEditPog: (id: number) => void;
  onGeneratePriceChange: (id: number, currentPrice: number) => void;
}

export interface CreatePogModalProps {
  onClose: () => void;
  onSubmit: (pog: Pog) => void;
}

export interface UpdatePogModalProps {
  pog: Pog;
  onClose: () => void;
  onSubmit: (updatedPog: Pog) => void;
}

export type Pog = {
  id?: number;
  name: string;
  ticker_symbol: string;
  price?: number;
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