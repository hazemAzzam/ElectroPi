import { ProductRepository } from "../_infrastructure/_repositories/product-repository";
import { ProductDetail } from "../_domain/product";
import { ApiError, getErrorMessage } from "../_services/api-service";

export type GetProductResult = { ok: true; product: ProductDetail } | { ok: false; error: string; notFound: boolean };

export async function getProduct(id: number): Promise<GetProductResult> {
  "use cache";

  try {
    const product = await new ProductRepository().getById(id);
    return { ok: true, product };
  } catch (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return { ok: false, error: getErrorMessage(error, "Product not found."), notFound };
  }
}
