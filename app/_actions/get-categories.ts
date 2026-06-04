import { ProductRepository } from "../_infrastructure/_repositories/product-repository";
import { getErrorMessage } from "../_services/api-service";

export type GetCategoriesResult = { ok: true; categories: string[] } | { ok: false; error: string };

export async function getCategories(): Promise<GetCategoriesResult> {
  "use cache";

  try {
    const categories = await new ProductRepository().categories();
    return { ok: true, categories };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Failed to load categories.") };
  }
}
