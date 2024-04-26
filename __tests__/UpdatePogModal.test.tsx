import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import UpdatePogModal from '@/components/UpdatePogModal';

describe('UpdatePogModal', () => {
  const pog = {
    id: 1,
    name: 'Pog 1',
    ticker_symbol: 'POG1',
    color: '#FF0000',
  };

  const onClose = jest.fn();
  const onSubmit = jest.fn();

  it('renders the modal with the pog details', () => {
    const { getByText } = render(
      <UpdatePogModal pog={pog} onClose={onClose} onSubmit={onSubmit} />
    );
    expect(getByText('Update Pog', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pog 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('POG1')).toBeInTheDocument();
    expect(screen.getByLabelText('Color')).toHaveValue('#ff0000');
  });

  it('calls onSubmit with the updated pog when the form is submitted', async () => {
    const { getByText, getByLabelText } = render(
      <UpdatePogModal pog={pog} onClose={onClose} onSubmit={onSubmit} />
    );
    const nameInput = getByLabelText('Pog Name');
    const tickerSymbolInput = getByLabelText('Ticker Symbol');
    const colorInput = getByLabelText('Color');

    fireEvent.change(nameInput, { target: { value: 'Pog 1 Updated' } });
    fireEvent.change(tickerSymbolInput, { target: { value: 'POG1_UPDATED' } });
    fireEvent.change(colorInput, { target: { value: '#00FF00' } });

    const submitButton = getByText('Update Pog', { selector: 'Button' });
    fireEvent.click(submitButton);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith({
      id: 1,
      name: 'Pog 1 Updated',
      ticker_symbol: 'POG1_UPDATED',
      color: '#00ff00',
    });
  });

  it('displays an error message when the form is submitted with empty fields', async () => {
    const { getByText, getByLabelText } = render(
      <UpdatePogModal pog={pog} onClose={onClose} onSubmit={onSubmit} />
    );
    const nameInput = getByLabelText('Pog Name');
    const tickerSymbolInput = getByLabelText('Ticker Symbol');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(tickerSymbolInput, { target: { value: '' } });

    const submitButton = getByText('Update Pog', { selector: 'Button' });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(getByText('Please fill up all fields.')).toBeInTheDocument()
    );
  });
});
