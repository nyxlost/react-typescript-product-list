import React from 'react';
import { PaginationComponentProps } from '../interfaces/interfaceComponents'

const Pagination: React.FC<PaginationComponentProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={(currentPage * itemsPerPage) >= totalItems}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
