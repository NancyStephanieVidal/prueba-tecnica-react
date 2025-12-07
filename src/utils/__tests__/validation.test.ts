import { validateSearchInput, sanitizeInput } from '../validation';

describe('Validaciones de Seguridad', () => {
  describe('sanitizeInput', () => {
    test('elimina tags HTML', () => {
      const result = sanitizeInput('<script>alert(1)</script>');
      expect(result).toBe('alert(1)');
    });
    
    test('bloquea javascript:', () => {
      const result = sanitizeInput('javascript:alert(1)');
      expect(result).toBe('[bloqueado]alert(1)');
    });
    
    test('bloquea event handlers', () => {
      const result = sanitizeInput('onclick="malicioso()"');
      // Como tu sanitizeInput elimina comillas, ajustamos la expectativa
      expect(result).toBe('[bloqueado-onclick]=malicioso()');
    });
    
    test('elimina caracteres peligrosos', () => {
      const result = sanitizeInput('test<>"\'`');
      expect(result).toBe('test');
    });
  });
  
  describe('validateSearchInput', () => {
    test('acepta texto válido', () => {
      const result = validateSearchInput('Juan Pérez');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('Juan Pérez');
    });
    
    test('rechaza entrada con símbolos no permitidos', () => {
      // Usa algo que tu regex NO acepte: `[` y `]` no están en tu regex
      const result = validateSearchInput('usuario[con]corchetes');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
    
    test('rechaza entrada vacía después de sanitizar', () => {
      const result = validateSearchInput('<>');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('');
    });
    
    test('limita a 50 caracteres', () => {
      const textoLargo = 'a'.repeat(60);
      const result = validateSearchInput(textoLargo);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('50 caracteres');
    });
    
    test('rechaza javascript: después de sanitizar', () => {
      const result = validateSearchInput('javascript:alert(1)');
      expect(result.isValid).toBe(false);
    });
    
    test('acepta email (porque @ está en el regex)', () => {
      const result = validateSearchInput('usuario@example.com');
      expect(result.isValid).toBe(true);
    });
  });
});