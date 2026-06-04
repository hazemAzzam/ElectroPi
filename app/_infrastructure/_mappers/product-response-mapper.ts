import { Product } from "@/app/_domain/product";
import { ProductResponseDTO } from "../_dtos/product-dto";
import { Paginated } from "@/app/_domain/paginated";

export class ProductResponseMapper {
  toDomain(productDto: ProductResponseDTO["products"][number]): Product {
    return {
      id: productDto.id,
      title: productDto.title,
      description: productDto.description,
      category: productDto.category,
      price: productDto.price,
      discountPercentage: productDto.discountPercentage,
      image: productDto.thumbnail,
    };
  }

  toDomainList(productResponseDto: ProductResponseDTO): Paginated<Product[]> {
    return {
      items: productResponseDto.products.map(this.toDomain),
      limit: productResponseDto.limit,
      skip: productResponseDto.skip,
      total: productResponseDto.total,
    };
  }
}
