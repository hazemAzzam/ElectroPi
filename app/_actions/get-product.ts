"use server";

import { ProductRepository } from "../_infrastructure/_repositories/product-repository";
import { Product } from "../_domain/product";
import { getErrorMessage } from "../_services/api-service";

export type GetProductResult =
  | { ok: true; product: Product }
  | { ok: false; error: string };

export async function getProduct(id: number): Promise<GetProductResult> {
  try {
    const product = await new ProductRepository().getById(id);
    return { ok: true, product };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Product not found.") };
  }
}
