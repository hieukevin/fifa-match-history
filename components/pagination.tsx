import Link from "next/link";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({
  prevPage,
  nextPage,
  pageNumbers,
  currentPage,
  totalPages,
}: {
  prevPage: number;
  nextPage: number;
  pageNumbers: number[];
  currentPage: number;
  totalPages: number;
  totalPage: number;
}) {
  return (
      <div className="flex border gap-4 rounded-xl sm:p-4 p-2">
        {currentPage === 1 ? (
          <div className="opacity-60 flex items-center" aria-disabled="true">
            <IoIosArrowBack />
          </div>
        ) : (
          <Link
            href={`?page=${prevPage}`}
            aria-label="Previous Page"
            className="flex items-center"
          >
            <IoIosArrowBack />
          </Link>
        )}

        {pageNumbers.map((pageNumber, index) => (
          <Link
            key={index}
            className={
              currentPage === pageNumber
                ? "border fw-bold px-2 rounded-md "
                : "hover:border px-1 rounded-md"
            }
            href={`?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
        ))}

        {currentPage === totalPages ? (
          <div className="opacity-60 flex items-center" aria-disabled="true">
            <IoIosArrowForward width={16} height={16} />
          </div>
        ) : (
          <Link
            href={`?page=${nextPage}`}
            aria-label="Next Page"
            className="flex items-center"
          >
            <IoIosArrowForward />
          </Link>
        )}
      </div>
  );
}
