'use client';

import React, { useState, useEffect } from 'react';

import { Pog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import CreatePogModal from '@/components/CreatePogModal';
import PogsList from '@/components/PogsList';
import UpdatePogModal from '@/components/UpdatePogModal';

export default function HomePage() {
  const [pogs, setPogs] = useState<Pog[]>([]);
  const [showCreatePogModal, setShowCreatePogModal] = useState(false);
  const [showUpdatePogModal, setShowUpdatePogModal] = useState(false);
  const [editingPog, setEditingPog] = useState<Pog | null>(null);

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

  const handleDeletePog = async (id: number) => {
    console.log('handleDeletePog called with ID: ', id);
    const response = await fetch(`/api/pogs?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      setPogs(pogs.filter((pog) => pog.id !== id));
    } else {
      console.error('Error deleting Pog: ', response.status);
    }
  };

  const handleEditPog = async (id: number) => {
    const pog = pogs.find((pog) => pog.id === id);
    if (pog) {
      setShowUpdatePogModal(true);
      setEditingPog(pog);
    }
  };

  const handleUpdatePog = async (updatedPog: Pog) => {
    const response = await fetch(`/api/pogs?id=${updatedPog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPog),
    });
    if (response.ok) {
      setPogs(pogs.map((pog) => (pog.id === updatedPog.id ? updatedPog : pog)));
      setShowUpdatePogModal(false);
    } else {
      console.error('Error updating Pog: ', response.status);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">PogsChamp</h1>
      {pogs.length > 0 ? (
        <PogsList
          pogs={pogs}
          onDeletePog={handleDeletePog}
          onEditPog={handleEditPog}
        />
      ) : (
        <p className="text-gray- italic">No pogs currently available.</p>
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
      {showUpdatePogModal && editingPog && (
        <UpdatePogModal
          pog={editingPog}
          onClose={() => setShowUpdatePogModal(false)}
          onSubmit={handleUpdatePog}
        />
      )}
    </div>
  );
}
