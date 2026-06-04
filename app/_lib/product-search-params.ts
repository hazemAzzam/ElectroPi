import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const PAGE_SIZE = 30;

export const productSearchParams = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

export const productSearchParamsCache = createSearchParamsCache(productSearchParams);
