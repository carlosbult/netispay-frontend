import { type Table } from '@tanstack/react-table';

interface UsePaginationProps<TData> {
  table: Table<TData>;
  totalItems: number;
  pagesToShow?: number;
}

export const usePagination = <TData>({
  table,
  totalItems,
  pagesToShow = 4,
}: UsePaginationProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Calcular el rango de páginas a mostrar
  let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(endPage - pagesToShow + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  // Calcular los índices de registros mostrados
  const { pageSize, pageIndex } = table.getState().pagination;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    startPage,
    endPage,
    pages,
    startIndex,
    endIndex,
  };
};
