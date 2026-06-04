import { apiService } from "@/app/_services/api-service";
import { ProductResponseDTO } from "../_dtos/product-dto";

export class ProductRepository {
  async getProducts() {
    return apiService.get<ProductResponseDTO>("/products", { auth: false });
  }
}
