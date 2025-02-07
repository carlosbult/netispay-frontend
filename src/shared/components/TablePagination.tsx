'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { type Table } from '@tanstack/react-table';
import { usePagination } from '../../lib/usePagination';

interface TablePaginationProps<TData> {
  table: Table<TData>;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}

export const TablePagination = <TData,>({
  table,
  totalItems,
  pageSizeOptions = [100, 200, 300, 400, 500],
  onPageSizeChange,
}: TablePaginationProps<TData>) => {
  const {
    currentPage,
    totalPages,
    startPage,
    endPage,
    pages,
    startIndex,
    endIndex,
  } = usePagination({ table, totalItems });

  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="p-2 mt-2">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm text-gray-500">
          Viendo {startIndex} - {endIndex} de {totalItems} registros
        </div>

        <div className="flex items-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    table.previousPage();
                  }}
                  className={
                    !table.getCanPreviousPage()
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>

              {/* Primera página */}
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      className={`rounded-xl ${currentPage === startPage ? '' : 'cursor-pointer'}`}
                      onClick={() => {
                        table.setPageIndex(0);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && <PaginationEllipsis />}
                </>
              )}

              {/* Páginas centrales */}
              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={`rounded-xl ${currentPage === page ? '' : 'cursor-pointer'}`}
                    onClick={() => {
                      table.setPageIndex(page - 1);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Última página */}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <PaginationEllipsis />}
                  <PaginationItem
                    className={`rounded-xl ${currentPage === endPage ? '' : 'cursor-pointer'}`}
                  >
                    <PaginationLink
                      onClick={() => {
                        table.setPageIndex(totalPages - 1);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    table.nextPage();
                  }}
                  className={
                    !table.getCanNextPage()
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Filas por página</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newSize = Number(value);
              table.setPageSize(newSize);
              onPageSizeChange?.(newSize);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
