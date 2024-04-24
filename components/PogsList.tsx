import React from 'react';
import PogCard from './PogCard';
import { PogsListProps } from '@/lib/types';

const PogsList: React.FC<PogsListProps> = ({
  pogs,
  onDeletePog,
  onEditPog,
  onGeneratePriceChange,
}) => {
  return (
    <div>
      {pogs.map((pog) => (
        <PogCard
          key={pog.id}
          pog={pog}
          onDeletePog={onDeletePog}
          onEditPog={onEditPog}
          onGeneratePriceChange={onGeneratePriceChange}
        />
      ))}
    </div>
  );
};

export default PogsList;
