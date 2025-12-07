import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component Tests', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza input de búsqueda', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/buscar usuario/i)).toBeInTheDocument();
  });

  test('actualiza valor al escribir', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/buscar usuario/i);
    
    fireEvent.change(input, { target: { value: 'Juan' } });
    expect(input).toHaveValue('Juan');
  });

  test('llama a onSearch con debounce', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/buscar usuario/i);
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    }, { timeout: 400 });
  });
});
