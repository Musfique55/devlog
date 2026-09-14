"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  itemsName : string,
  limit: number;
}

const Pagination = ({ currentPage, meta,itemsName, limit }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let pageNumber: number | null = null;

  if (!currentPage) {
    pageNumber = Number(searchParams.get("page"));
  }

  const handlePrevious = () => {
    if (currentPage) {
      if (currentPage > 1) {
        const url = new URLSearchParams(searchParams);
        url.set("page", (currentPage - 1).toString());
        router.push(`?${url.toString()}`);
      }
    } else {
      if (pageNumber) {
        if (pageNumber > 1) {
          const url = new URLSearchParams(searchParams);
          url.set("page", (pageNumber - 1).toString());
          router.push(`?${url.toString()}`);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentPage) {
      if (meta && currentPage < meta.totalPages) {
        const url = new URLSearchParams(searchParams);
        url.set("page", (currentPage + 1).toString());
        router.push(`?${url.toString()}`);
      }
    } else {
      if (pageNumber) {
        if (meta && pageNumber < meta.totalPages) {
          const url = new URLSearchParams(searchParams);
          url.set("page", (pageNumber + 1).toString());
          router.push(`?${url.toString()}`);
        }
      }
    }
  };

  const handlePageSelect = (page: number) => {
    const url = new URLSearchParams(searchParams);
    url.set("page", page.toString());
    router.push(`?${url.toString()}`);
  };
  return (
    <div className="mt-5 flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 px-6 py-4">
      <div className="text-xs text-zinc-500 font-medium">
        Showing{" "}
        <span className="text-zinc-300 font-semibold">
          {currentPage ? (currentPage - 1) * limit + 1 : pageNumber ? (pageNumber - 1) * limit + 1 : 1}
        </span>{" "}
        to{" "}
        <span className="text-zinc-300 font-semibold">
          {currentPage ? Math.min(currentPage * limit, meta?.total || 0) : pageNumber ? Math.min(pageNumber * limit, meta?.total || 0) : Math.min(limit, meta?.total || 0)}
        </span>{" "}
        of{" "}
        <span className="text-zinc-300 font-semibold">{meta?.total || 0}</span>{" "}
        {itemsName}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage ? currentPage === 1 : pageNumber === 1}
          className="hidden lg:block border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentPage ? currentPage === 1 : pageNumber === 1}
          className="lg:hidden block border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mx-auto" />

        </Button>

        <div className="flex items-center gap-1">
          {meta.totalPages > 1 ? (
            [...Array(meta.totalPages)].map((_, index) => {
              return (
                <Button
                  key={index}
                  variant={currentPage ? currentPage === index + 1 ? "default" : "ghost" : pageNumber === index + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handlePageSelect(index + 1)}
                  className={
                   currentPage ? currentPage === index + 1
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  : pageNumber === index + 1
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                }
                >
                  {index + 1}
                </Button>
              );
            })
          ) : (
            <Button
              variant="ghost"
              className="w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white cursor-pointer text-xs font-bold"
            >
              1
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage ? currentPage === meta?.totalPages : pageNumber === meta?.totalPages}
          className="hidden lg:block border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage ? currentPage === meta?.totalPages : pageNumber === meta?.totalPages}
          className="block lg:hidden border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 mx-auto" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
