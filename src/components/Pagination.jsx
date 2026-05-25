import { useState } from "react";
import { Button } from "./Button";

export const Pagination = ({ totalPages, onPaginate, page }) => {
  return totalPages > 1 ? (
    <div className="flex items-center justify-center gap-1 py-6 flex-wrap px-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
            key={i + 1}
            onClick={() => onPaginate(i + 1)}
            className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
              page - 1 === i
                ? "bg-teal-400 text-zinc-900"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
        >
            {i + 1}
        </Button>
      ))}
    </div>
  ) : null;
};