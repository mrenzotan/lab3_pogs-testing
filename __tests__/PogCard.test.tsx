import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import PogCard from '@/components/PogCard';

const pog = {
  id: 1,
  name: 'Pog 1',
  ticker_symbol: 'POG1',
  price: 10.99,
  color: 'red',
};

const onDeletePog = jest.fn();
const onEditPog = jest.fn();
const onGeneratePriceChange = jest.fn();

describe('PogCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PogCard
        pog={pog}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    expect(getByText(pog.name)).toBeInTheDocument();
    expect(getByText(pog.ticker_symbol)).toBeInTheDocument();
    expect(getByText(`Price: ₱${pog.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('calls onDeletePog when delete button is clicked', () => {
    const { getByText } = render(
      <PogCard
        pog={pog}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    const deleteButton = getByText('Delete Pog');
    fireEvent.click(deleteButton);

    expect(onDeletePog).toHaveBeenCalledTimes(1);
    expect(onDeletePog).toHaveBeenCalledWith(pog.id);
  });

  it('calls onEditPog when edit button is clicked', () => {
    const { getByText } = render(
      <PogCard
        pog={pog}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    const editButton = getByText('Edit Pog');
    fireEvent.click(editButton);

    expect(onEditPog).toHaveBeenCalledTimes(1);
    expect(onEditPog).toHaveBeenCalledWith(pog.id);
  });

  it('calls onGeneratePriceChange when change price button is clicked', () => {
    const { getByText } = render(
      <PogCard
        pog={pog}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    const changePriceButton = getByText('Change Price');
    fireEvent.click(changePriceButton);

    expect(onGeneratePriceChange).toHaveBeenCalledTimes(1);
    expect(onGeneratePriceChange).toHaveBeenCalledWith(pog.id, pog.price);
  });
});
