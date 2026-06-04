import { ProductRepository } from "@/src/infrastructure/repositories/product-repository";
import { ProductSearchState } from "@/src/infrastructure/mappers/product-request-mapper";
import { Paginated } from "@/src/domain/paginated";
import { Category } from "@/src/domain/category";
import { getErrorMessage } from "@/src/infrastructure/services/api-service";

export type GetProductsResult = { ok: true; page: Paginated<Category> } | { ok: false; error: string };

export async function getProducts(state: ProductSearchState): Promise<GetProductsResult> {
  "use cache";
  try {
    const page = await new ProductRepository().list(state);
    return { ok: true, page };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Failed to load products.") };
  }
}
