import { i18nText } from "@/lib/i18nText";
import React from "react";

interface PaginationProps {
  currentPage: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  total,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      onPageChange(pageNumber);
    }
  };

  const baseBtn =
    "inline-flex h-10 min-w-10 items-center justify-center border px-3 text-sm font-medium transition nk-focus-ring";
  const activeBtn = "border-amber-300 bg-amber-50 text-amber-800";
  const normalBtn = "border-border bg-background text-foreground hover:border-amber-300 hover:bg-amber-50/40";
  const disabledBtn = "cursor-not-allowed opacity-50";

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxPagesToShow = 5;

    pages.push(
      <button
        key={1}
        onClick={() => handlePageClick(1)}
        className={`${baseBtn} ${currentPage === 1 ? activeBtn : normalBtn}`}
        aria-current={currentPage === 1 ? "page" : undefined}
        disabled={currentPage === 1}
      >
        1
      </button>
    );

    if (totalPages > maxPagesToShow) {
      const startPage = Math.max(
        2,
        currentPage - Math.floor((maxPagesToShow - 3) / 2)
      );
      const endPage = Math.min(
        totalPages - 1,
        currentPage + Math.ceil((maxPagesToShow - 3) / 2)
      );

      if (startPage > 2) {
        pages.push(
          <span key="dots-start" className="px-2 text-sm text-muted-foreground select-none">
            ...
          </span>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${baseBtn} ${currentPage === i ? activeBtn : normalBtn}`}
            aria-current={currentPage === i ? "page" : undefined}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className="px-2 text-sm text-muted-foreground select-none">
            ...
          </span>
        );
      }
    } else {
      for (let i = 2; i < totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${baseBtn} ${currentPage === i ? activeBtn : normalBtn}`}
            aria-current={currentPage === i ? "page" : undefined}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`${baseBtn} ${
            currentPage === totalPages ? activeBtn : normalBtn
          }`}
          aria-current={currentPage === totalPages ? "page" : undefined}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full">
      <nav
        className="flex flex-wrap items-center justify-center gap-2 p-4"
        aria-label="Pagination"
      >
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={`${baseBtn} ${currentPage === 1 ? disabledBtn : normalBtn}`}
          disabled={currentPage === 1}
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>{i18nText("AUTO.components.ui.pagination.line149_0_truoc")}</button>

        <div className="flex items-center gap-2">{renderPageNumbers()}</div>

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={`${baseBtn} ${currentPage === totalPages ? disabledBtn : normalBtn}`}
          disabled={currentPage === totalPages}
        >
          Sau
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
