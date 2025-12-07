import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Si solo hay una página o menos, no mostrar paginación
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generar números de página
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Ajustar si estamos al final
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let pageNum = start; pageNum <= end; pageNum++) {
      pages.push(
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
          type="button"
        >
          {pageNum}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
        type="button"
      >
        Anterior
      </button>
      
      <div className="page-numbers">
        {renderPageNumbers()}
      </div>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
        type="button"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;