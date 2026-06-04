import { Product } from "@/app/_domain/product";
import { ProductResponseDTO } from "../_dtos/product-dto";
import { Paginated } from "@/app/_domain/paginated";
import { Category } from "@/app/_domain/category";

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

  toDomainList(productResponseDto: ProductResponseDTO): Paginated<Category> {
    const products = productResponseDto.products.map((p) => this.toDomain(p));
    return {
      items: Object.groupBy(products, (p) => p.category),
      limit: productResponseDto.limit,
      pages: Math.ceil(productResponseDto.total / productResponseDto.limit),
      skip: productResponseDto.skip,
      total: productResponseDto.total,
    };
  }
}
