import React, { useState } from 'react';
import { Pog } from '@/lib/types';
import { Button } from './ui/button';

interface CreatePogModalProps {
  onClose: () => void;
  onSubmit: (pog: Pog) => void;
}

export const CreatePogModal: React.FC<CreatePogModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState('#000000');

  const handleSubmit = () => {
    const newPog: Pog = {
      name,
      ticker_symbol: tickerSymbol,
      price,
      color,
    };
    onSubmit(newPog);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create Pog</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Pog Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Pog name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ticker-symbol"
              className="block text-gray-700 font-bold mb-2"
            >
              Ticker Symbol
            </label>
            <input
              type="text"
              id="ticker-symbol"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter ticker symbol"
              value={tickerSymbol}
              onChange={(e) => setTickerSymbol(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-gray-700 font-bold mb-2"
            >
              Color
            </label>
            <input
              type="color"
              id="color"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Pog</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
