import React, { useState, useEffect, useRef } from 'react';
import { validateSearchInput, sanitizeInput } from '../utils/validation';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar usuario por nombre...",
  debounceDelay = 300 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchTerm.trim() === '') {
      onSearch('');
      setError('');
      return;
    }

    debounceRef.current = setTimeout(() => {
      performSearch();
    }, debounceDelay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const performSearch = () => {
    if (searchTerm.trim() === '') {
      onSearch('');
      setError('');
      return;
    }

    // 1. Sanitizar el input
    const sanitizedValue = sanitizeInput(searchTerm);
    
    // 2. Validar (versión mejorada que retorna objeto)
    const validationResult = validateSearchInput(sanitizedValue);
    
    if (validationResult.isValid) {
      setSearchTerm(sanitizedValue);
      setError('');
      setIsTyping(false);
      onSearch(sanitizedValue);
    } else {
      setError(validationResult.error || 'Entrada no válida');
      // Opcional: mantener el input pero marcarlo como error
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsTyping(true);
    
    // Validación en tiempo real para feedback inmediato
    if (value.trim() !== '') {
      const sanitized = sanitizeInput(value);
      const validation = validateSearchInput(sanitized);
      
      if (!validation.isValid) {
        setError(validation.error || '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Bloquear teclas potencialmente peligrosas
    const dangerousKeys = ['<', '>', '"', "'", '`', '&'];
    if (dangerousKeys.includes(e.key)) {
      e.preventDefault();
      setError(`El caracter "${e.key}" no está permitido`);
    }
    
    // Buscar al presionar Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      performSearch();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Validar contenido pegado
    const pastedText = e.clipboardData.getData('text');
    const sanitized = sanitizeInput(pastedText);
    const validation = validateSearchInput(sanitized);
    
    if (!validation.isValid) {
      e.preventDefault();
      setError('No puedes pegar ese contenido');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setError('');
    setIsTyping(false);
    onSearch('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className={`search-input ${error ? 'input-error' : ''}`}
          aria-label="Buscar usuarios"
          aria-invalid={!!error}
          aria-describedby={error ? "search-error" : undefined}
          maxLength={50}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        
        {searchTerm && (
          <button 
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Limpiar búsqueda"
            disabled={isTyping}
          >
            {isTyping ? '⌛' : '✕'}
          </button>
        )}
      </div>
      
      {error && (
        <div 
          id="search-error" 
          className="error-message" 
          role="alert"
          style={{
            color: '#d32f2f',
            fontSize: '0.875rem',
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#ffebee',
            borderRadius: '4px',
            border: '1px solid #ef9a9a',
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>⚠️</span>
          {error}
        </div>
      )}
      
      {!error && searchTerm && isTyping && (
        <div 
          className="typing-indicator"
          style={{
            fontSize: '0.75rem',
            color: '#666',
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}
        >
          Escribiendo... (búsqueda automática en {debounceDelay}ms)
        </div>
      )}
      
      <div 
        className="security-notice"
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#4caf50',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
      >
      </div>
    </div>
  );
};

export default SearchBar;