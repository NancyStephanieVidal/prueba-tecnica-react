// src/utils/validations.ts (o .js si usas JavaScript)

/**
 * Validación completa para prevenir ataques de scripting (XSS)
 * @param input - Texto a validar
 * @returns {isValid: boolean, sanitized: string, error?: string}
 */
export const validateSearchInput = (input: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} => {
  // 1. Sanitizar primero
  const sanitized = sanitizeInput(input);
  
  // 2. Validar longitud (50 caracteres máximo)
  if (sanitized.length > 50) {
    return {
      isValid: false,
      sanitized: sanitized.substring(0, 50),
      error: 'La búsqueda no puede exceder 50 caracteres'
    };
  }
  
  // 3. Validar caracteres permitidos (más estricto)
  const safeRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,@\-_]*$/;
  
  if (!safeRegex.test(sanitized)) {
    return {
      isValid: false,
      sanitized: sanitized,
      error: 'Solo se permiten letras, números y espacios'
    };
  }
  
  // 4. Validar que no sea solo espacios
  if (sanitized.trim().length === 0) {
    return {
      isValid: true,
      sanitized: '',
      error: undefined
    };
  }
  
  return {
    isValid: true,
    sanitized: sanitized,
    error: undefined
  };
};

/**
 * Sanitización profunda para prevenir XSS
 * @param input - Texto a sanitizar
 * @returns Texto seguro
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // 1. Eliminar tags HTML/XML
  sanitized = sanitized.replace(/<[^>]*>?/gm, '');
  
  // 2. Eliminar scripts JavaScript (completo, no solo palabra "script")
  sanitized = sanitized.replace(/javascript:/gi, '[bloqueado]');
  sanitized = sanitized.replace(/data:/gi, '[bloqueado]');
  sanitized = sanitized.replace(/vbscript:/gi, '[bloqueado]');
  
  // 3. Eliminar event handlers peligrosos
  const dangerousEvents = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
    'onkeydown', 'onkeypress', 'onkeyup', 'onsubmit'
  ];
  
  dangerousEvents.forEach(event => {
    const regex = new RegExp(event, 'gi');
    sanitized = sanitized.replace(regex, `[bloqueado-${event}]`);
  });
  
  // 4. Eliminar caracteres peligrosos
  sanitized = sanitized.replace(/[<>"'`]/g, '');
  
  // 5. Eliminar caracteres de control
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  
  // 6. Limitar longitud (por seguridad adicional)
  sanitized = sanitized.substring(0, 100);
  
  return sanitized.trim();
};

/**
 * Función simple para uso rápido (backward compatibility)
 */
export const isSearchInputValid = (input: string): boolean => {
  const result = validateSearchInput(input);
  return result.isValid;
};