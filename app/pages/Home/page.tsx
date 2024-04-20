'use client';

import React, { useState, useEffect } from 'react';
import { Pog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CreatePogModal } from '@/components/CreatePogModal';

export default function HomePage() {
  const [pogs, setPogs] = useState<Pog[]>([]);
  const [showCreatePogModal, setShowCreatePogModal] = useState(false);

  useEffect(() => {
    const fetchPogs = async () => {
      const response = await fetch('/api/pogs');
      const data = await response.json();
      setPogs(data);
    };
    fetchPogs();
  }, []);

  const handleCreatePog = async (pog: Pog) => {
    const response = await fetch('/api/pogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pog),
    });
    const newPog = await response.json();
    setPogs([...pogs, newPog]);
    setShowCreatePogModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Pogs</h1>
      {pogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pogs.map((pog) => (
            <div
              key={pog.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold">{pog.name}</h2>
              <p className="text-gray-500">{pog.ticker_symbol}</p>
              <p className="text-gray-500">Price: ${pog.price.toFixed(2)}</p>
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: pog.color }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No pogs currently available.</p>
      )}
      <div className="mt-8 flex justify-end">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowCreatePogModal(true)}
        >
          Create Pog
        </Button>
      </div>
      {showCreatePogModal && (
        <CreatePogModal
          onClose={() => setShowCreatePogModal(false)}
          onSubmit={handleCreatePog}
        />
      )}
    </div>
  );
}
