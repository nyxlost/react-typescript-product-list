export interface PaginationComponentProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
  }