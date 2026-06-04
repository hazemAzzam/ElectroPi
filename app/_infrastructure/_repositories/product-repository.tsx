import { apiService } from "@/app/_services/api-service";
import { ProductResponseDTO } from "../_dtos/product-dto";
import { ProductResponseMapper } from "../_mappers/product-response-mapper";
import { ProductRequestMapper, ProductSearchState } from "../_mappers/product-request-mapper";
import { ProductDetail } from "@/app/_domain/product";
import { Paginated } from "@/app/_domain/paginated";
import { Category } from "@/app/_domain/category";

export interface ListProductsParams {
  limit?: number;
  skip?: number;
  /** Free-text search; routes to `/products/search`. */
  q?: string;
  /** Category slug; routes to `/products/category/{slug}`. */
  category?: string;
}

export class ProductRepository {
  private mapper = new ProductResponseMapper();
  private requestMapper = new ProductRequestMapper();

  async list(state: ProductSearchState): Promise<Paginated<Category>> {
    const { q, category, limit, skip } = this.requestMapper.toListParams(state);

    const path = q ? "/products/search" : category ? `/products/category/${category}` : "/products";

    const dto = await apiService.get<ProductResponseDTO>(path, {
      auth: false,
      query: { q, limit, skip },
    });

    return this.mapper.toDomainList(dto);
  }

  async getById(id: number): Promise<ProductDetail> {
    const dto = await apiService.get<ProductResponseDTO["products"][number]>(`/products/${id}`, { auth: false });
    return this.mapper.toDetail(dto);
  }

  async categories(): Promise<string[]> {
    return apiService.get<string[]>("/products/category-list", { auth: false });
  }
}
