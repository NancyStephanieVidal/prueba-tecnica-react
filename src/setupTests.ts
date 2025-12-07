import '@testing-library/jest-dom';

// Mock para axios
jest.mock('axios');

// Configuración adicional de testing
beforeEach(() => {
  // Limpiar todos los mocks antes de cada test
  jest.clearAllMocks();
});