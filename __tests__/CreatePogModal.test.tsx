import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreatePogModal from '@/components/CreatePogModal';

describe('CreatePogModal', () => {
  it('renders correctly', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByText } = render(
      <CreatePogModal onClose={onClose} onSubmit={onSubmit} />
    );
    expect(getByText('Create Pog', { selector: 'h2' })).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is submitted', async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <CreatePogModal onClose={onClose} onSubmit={onSubmit} />
    );
    const nameInput = getByLabelText('Pog Name');
    const tickerSymbolInput = getByLabelText('Ticker Symbol');
    const priceInput = getByLabelText('Price');
    const colorInput = getByLabelText('Color');

    fireEvent.change(nameInput, { target: { value: 'Test Pog' } });
    fireEvent.change(tickerSymbolInput, { target: { value: 'TEST' } });
    fireEvent.change(priceInput, { target: { value: '10.99' } });
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });

    const submitButton = getByText('Create Pog', { selector: 'Button' });
    fireEvent.click(submitButton);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test Pog',
      ticker_symbol: 'TEST',
      price: 10.99,
      color: '#ff0000',
    });
  });

  it('displays error message when form is invalid', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByText } = render(
      <CreatePogModal onClose={onClose} onSubmit={onSubmit} />
    );
    const submitButton = getByText('Create Pog', { selector: 'Button' });
    fireEvent.click(submitButton);
    expect(getByText('Please fill up all fields.')).toBeInTheDocument();
  });
});
