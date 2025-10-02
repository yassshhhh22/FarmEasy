import React from "react";

export default function Pagination({ page, limit, total, onPageChange }) {
  const canPrev = page > 1;
  const canNext = total ? page * limit < total : true;

  return (
    <div className="flex items-center justify-between pt-2">
      <div className="text-sm text-gray-600">
        Page {page} •{" "}
        {total ? Math.min(limit, total - (page - 1) * limit) : "-"} /{" "}
        {total || "-"}
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
