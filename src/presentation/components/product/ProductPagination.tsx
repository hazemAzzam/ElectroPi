"use client";

import { useQueryStates } from "nuqs";
import { productSearchParams } from "@/src/presentation/lib/product-search-params";
import { Button } from "@/src/presentation/components/ui/button";

export default function ProductPagination({ totalPages }: { totalPages: number }) {
  const [{ page }, setParams] = useQueryStates(productSearchParams);

  if (totalPages <= 1) return null;

  const go = (next: number) =>
    setParams({ page: Math.min(Math.max(next, 1), totalPages) }, { shallow: false });

  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => go(page - 1)}>
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
