"use client";

import { useQueryStates, debounce } from "nuqs";
import { productSearchParams } from "@/app/_lib/product-search-params";
import { Input } from "@/app/_components/ui/input";

export default function ProductSearch() {
  const [{ q }, setParams] = useQueryStates(productSearchParams);

  return (
    <div className="flex w-full flex-col gap-1.5 sm:max-w-sm">
      <label htmlFor="product-search" className="text-sm font-medium text-foreground">
        Search
      </label>
      <Input
        id="product-search"
        type="search"
        placeholder="Search products…"
        defaultValue={q}
        onChange={(e) => setParams({ q: e.target.value, page: 1 }, { shallow: false, limitUrlUpdates: debounce(300) })}
      />
    </div>
  );
}
