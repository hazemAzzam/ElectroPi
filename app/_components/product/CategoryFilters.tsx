"use client";

import { productSearchParams } from "@/app/_lib/product-search-params";
import { useQueryStates } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const ALL_CATEGORIES = "";

export default function CategoryFilters({ categories }: { categories: string[] }) {
  const [{ category }, setParams] = useQueryStates(productSearchParams);

  return (
    <div className="flex w-full flex-col gap-1.5 sm:w-56">
      <label htmlFor="category-filter" className="text-sm font-medium text-foreground">
        Category
      </label>
      <Select value={category} onValueChange={(value) => setParams({ category: value ?? ALL_CATEGORIES, page: 1 }, { shallow: false })}>
        <SelectTrigger id="category-filter" className="w-full capitalize">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
          {categories.map((categoryName) => (
            <SelectItem key={categoryName} value={categoryName} className="capitalize">
              {categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
