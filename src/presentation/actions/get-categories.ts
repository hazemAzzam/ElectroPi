import { container } from "@/src/infrastructure/di";
import { getErrorMessage } from "@/src/infrastructure/services/api-service";

export type GetCategoriesResult = { ok: true; categories: string[] } | { ok: false; error: string };

export async function getCategories(): Promise<GetCategoriesResult> {
  "use cache";

  try {
    const categories = await container.productsRepository.categories();
    return { ok: true, categories };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Failed to load categories.") };
  }
}
