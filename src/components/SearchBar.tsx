import React, { useState } from 'react';
import { validateSearchInput, sanitizeInput } from '../utils/validation';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = sanitizeInput(value);
    
    if (validateSearchInput(sanitizedValue)) {
      setSearchTerm(sanitizedValue);
      setError('');
      onSearch(sanitizedValue);
    } else {
      setError('Por favor, ingresa solo letras, números y espacios (máx. 50 caracteres)');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setError('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          aria-label="Buscar usuario"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="clear-button"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;