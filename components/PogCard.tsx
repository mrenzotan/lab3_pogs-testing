import React from 'react';

import { PogCardProps } from '@/lib/types';
import { Button } from './ui/button';

const PogCard: React.FC<PogCardProps> = ({ pog, onDeletePog, onEditPog }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-4 flex flex-col items-center"
      key={pog.id}
    >
      <h2 className="text-xl font-bold">{pog.name}</h2>
      <p>{pog.ticker_symbol}</p>
      <p>Price: ₱{pog.price.toFixed(2)}</p>
      <div
        className="w-10 h-10 rounded-full"
        style={{ backgroundColor: pog.color }}
      ></div>
      <Button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
        onClick={() => pog.id && onEditPog(pog.id)}
      >
        Edit Pog
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          console.log('Delete button clicked: ', pog.id);
          pog.id && onDeletePog(pog.id);
        }}
      >
        Delete Pog
      </Button>
    </div>
  );
};

export default PogCard;
