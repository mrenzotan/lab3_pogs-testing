import React from 'react';
import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import PogsList from '@/components/PogsList';

describe('PogsList', () => {
  it('renders multiple PogCards', () => {
    const pogs = [
      {
        id: 1,
        name: 'Pog 1',
        ticker_symbol: 'POG1',
        price: 10.0,
        color: '#FF0000',
      },
      {
        id: 2,
        name: 'Pog 2',
        ticker_symbol: 'POG2',
        price: 20.0,
        color: '#00FF00',
      },
    ];
    const onDeletePog = jest.fn();
    const onEditPog = jest.fn();
    const onGeneratePriceChange = jest.fn();

    const { getAllByText } = render(
      <PogsList
        pogs={pogs}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    expect(getAllByText(/Pog [1-2]/)).toHaveLength(2);
  });

  it('passes props correctly to PogCard', () => {
    const pogs = [
      {
        id: 1,
        name: 'Pog 1',
        ticker_symbol: 'POG1',
        price: 10.0,
        color: '#FF0000',
      },
    ];
    const onDeletePog = jest.fn();
    const onEditPog = jest.fn();
    const onGeneratePriceChange = jest.fn();

    const { getByText } = render(
      <PogsList
        pogs={pogs}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    const pogCardElement = getByText('Pog 1').parentElement;
    expect(pogCardElement).toBeInTheDocument();
  });

  it('updates PogCard props when pogs changes', () => {
    const pogs = [
      {
        id: 1,
        name: 'Pog 1',
        ticker_symbol: 'POG1',
        price: 10.0,
        color: '#FF0000',
      },
    ];
    const updatedPogs = [
      {
        id: 1,
        name: 'Pog 1 Updated',
        ticker_symbol: 'POG1_UPDATED',
        price: 10.0,
        color: '#00FF00',
      },
    ];
    const onDeletePog = jest.fn();
    const onEditPog = jest.fn();
    const onGeneratePriceChange = jest.fn();

    const { getByText, rerender } = render(
      <PogsList
        pogs={pogs}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    rerender(
      <PogsList
        pogs={updatedPogs}
        onDeletePog={onDeletePog}
        onEditPog={onEditPog}
        onGeneratePriceChange={onGeneratePriceChange}
      />
    );

    const pogCardElement = getByText('Pog 1 Updated').parentElement;
    expect(pogCardElement).toBeInTheDocument();

    const nameElement = within(pogCardElement!).getByText('Pog 1 Updated');
    expect(nameElement).toBeInTheDocument();

    const tickerSymbolElement = within(pogCardElement!).getByText(
      'POG1_UPDATED'
    );
    expect(tickerSymbolElement).toBeInTheDocument();

    const colorElement = pogCardElement!.querySelector(
      '.w-10.h-10.rounded-full'
    );
    expect(getComputedStyle(colorElement!).backgroundColor).toBe(
      'rgb(0, 255, 0)'
    );
  });
});
