import React, { useState } from 'react';

import { Pog } from '@/lib/types';
import { Button } from './ui/button';

import { CreatePogModalProps } from '@/lib/types';

export const CreatePogModal: React.FC<CreatePogModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !tickerSymbol || price <= 0) {
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
      const newPog: Pog = {
        name,
        ticker_symbol: tickerSymbol,
        price,
        color,
      };
      onSubmit(newPog);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value <= 0) {
      setError('Price must be a positive number.');
      return;
    }
    setPrice(value);
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
              onChange={handlePriceChange}
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
            <Button onClick={handleSubmit}>Create Pog</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePogModal;
