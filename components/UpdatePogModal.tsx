import React, { useState } from 'react';

import { Pog } from '@/lib/types';
import { Button } from './ui/button';

import { UpdatePogModalProps } from '@/lib/types';

export const UpdatePogModal: React.FC<UpdatePogModalProps> = ({
  pog,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(pog.name);
  const [tickerSymbol, setTickerSymbol] = useState(pog.ticker_symbol);
  const [price, setPrice] = useState(pog.price);
  const [color, setColor] = useState(pog.color);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !tickerSymbol) {
      setError('Please fill up all fields.');
      return;
    }

    try {
      const response = await fetch(`/api/pogs?tickerSymbol=${tickerSymbol}`);
      const existingPog = await response.json();
      if (existingPog.length > 0) {
        setError('Ticker symbol already exists.');
        return;
      }
      const updatedPog: Pog = {
        id: pog.id,
        name,
        ticker_symbol: tickerSymbol,
        price: price,
        color,
      };
      onSubmit(updatedPog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Update Pog</h2>
          <form onSubmit={handleSubmit}>
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
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div className="flex justify-end">
              <Button onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button type="submit">Update Pog</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePogModal;
