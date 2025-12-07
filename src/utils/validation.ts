export const validateSearchInput = (input: string): boolean => {
  // Limpiar entrada de posibles scripts
  const cleanInput = input.replace(/[<>]/g, '');
  
  // Validar que solo contenga letras, números y espacios
  const regex = /^[a-zA-Z0-9\s]*$/;
  
  // Validar longitud máxima
  const isValidLength = cleanInput.length <= 50;
  
  return regex.test(cleanInput) && isValidLength;
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Eliminar tags HTML
    .replace(/script/gi, '') // Eliminar palabra script
    .trim();
};