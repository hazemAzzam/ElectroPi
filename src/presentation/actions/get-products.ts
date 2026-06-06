import { Category } from "@/src/domain/category";
import { Paginated } from "@/src/domain/paginated";
import { container } from "@/src/infrastructure/di";
import { ProductSearchState } from "@/src/infrastructure/mappers/product-request-mapper";
import { getErrorMessage } from "@/src/infrastructure/services/api-service";

export type GetProductsResult = { ok: true; page: Paginated<Category> } | { ok: false; error: string };

export async function getProducts(state: ProductSearchState): Promise<GetProductsResult> {
  "use cache";
  try {
    const page = await container.productsRepository.list(state);
    return { ok: true, page };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Failed to load products.") };
  }
}
