import { SearchParams } from "nuqs/server";
import { getCategories } from "./_actions/get-categories";
import { getProducts } from "./_actions/get-products";
import CategoryFilters from "./_components/product/CategoryFilters";
import CategoryGrid from "./_components/product/CategoryGrid";
import ProductPagination from "./_components/product/ProductPagination";
import ProductSearch from "./_components/product/ProductSearch";
import Container from "./_layout/Container";
import { productSearchParamsCache } from "./_lib/product-search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = await productSearchParamsCache.parse(searchParams);

  const products = await getProducts(params);
  const categories = await getCategories();

  if (!products.ok || !categories.ok) {
    return (
      <Container>
        <p className="text-red-500">Failed to load products or categories.</p>
      </Container>
    );
  }

  return (
    <Container className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <ProductSearch />
        <CategoryFilters categories={categories.categories} />
      </div>

      {Object.entries(products.page.items).map(([category, items]) => (
        <CategoryGrid key={category} category={category} products={items!} />
      ))}

      <ProductPagination totalPages={products.page.pages} />
    </Container>
  );
}
