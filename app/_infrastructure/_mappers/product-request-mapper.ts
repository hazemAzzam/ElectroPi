import type { inferParserType } from "nuqs/server";
import { PAGE_SIZE, productSearchParams } from "@/app/_lib/product-search-params";
import type { ListProductsParams } from "../_repositories/product-repository";

/** Parsed URL state for the product list (`{ q, category, page }`). */
export type ProductSearchState = inferParserType<typeof productSearchParams>;

export class ProductRequestMapper {
  /**
   * Maps the product list's URL state to the repository's query params,
   * translating the 1-based `page` into DummyJSON's `skip`/`limit` pagination.
   *
   * Empty `q`/`category` (the parser defaults) become `undefined` so they're
   * omitted from the API request rather than sent as blank values.
   */
  toListParams({ q, category, page }: ProductSearchState): ListProductsParams {
    return {
      q: q || undefined,
      category: category || undefined,
      limit: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    };
  }
}
