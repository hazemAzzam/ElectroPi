import { ProductRepository } from "../_infrastructure/_repositories/product-repository";
import { ProductSearchState } from "../_infrastructure/_mappers/product-request-mapper";
import { Paginated } from "../_domain/paginated";
import { Category } from "../_domain/category";
import { getErrorMessage } from "../_services/api-service";

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
