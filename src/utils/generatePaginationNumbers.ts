export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // if total pages is lower or equal than 7, i will show all numbers
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is in the first 3 pages i will show first 3 pages, ellipsis and last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If current page is in the last 3 pages i will show first 2 pages, ellipsis and last 3 pages
  if (totalPages - currentPage < 3) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // if current page is in the middle
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
