import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import { getCategories } from "@/src/presentation/actions/get-categories";
import { getProducts } from "@/src/presentation/actions/get-products";
import CategoryFilters from "@/src/presentation/components/product-list/CategoryFilters";
import CategoryGrid from "@/src/presentation/components/product-list/CategoryGrid";
import ProductPagination from "@/src/presentation/components/product-list/ProductPagination";
import ProductSearch from "@/src/presentation/components/product-list/ProductSearch";
import ProductsEmpty from "@/src/presentation/components/product-list/ProductsEmpty";
import Container from "@/src/presentation/layout/Container";
import { productSearchParamsCache } from "@/src/presentation/lib/product-search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function CategoryFiltersSlot() {
  const categories = await getCategories();
  if (!categories.ok) return null;
  return <CategoryFilters categories={categories.categories} />;
}

async function ProductListing({ searchParams }: Props) {
  const params = await productSearchParamsCache.parse(searchParams);
  const products = await getProducts(params);

  if (!products.ok) {
    return <p className="text-red-500">Failed to load products.</p>;
  }

  if (products.page.total === 0) {
    return <ProductsEmpty />;
  }

  return (
    <>
      {Object.entries(products.page.items).map(([category, items]) => (
        <CategoryGrid key={category} category={category} products={items!} />
      ))}

      <ProductPagination totalPages={products.page.pages} />
    </>
  );
}

export default function Home({ searchParams }: Props) {
  return (
    <Container className="space-y-8">
      <Suspense fallback={null}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <ProductSearch />
          <CategoryFiltersSlot />
        </div>
      </Suspense>

      <Suspense fallback={<p className="text-muted-foreground">Loading products…</p>}>
        <ProductListing searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
