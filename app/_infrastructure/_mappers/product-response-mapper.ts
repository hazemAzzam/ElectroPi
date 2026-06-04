import { Product, ProductDetail } from "@/app/_domain/product";
import { ProductResponseDTO } from "../_dtos/product-dto";
import { Paginated } from "@/app/_domain/paginated";
import { Category } from "@/app/_domain/category";

type ProductDTO = ProductResponseDTO["products"][number];

export class ProductResponseMapper {
  toDomain(productDto: ProductDTO): Product {
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

  toDetail(productDto: ProductDTO): ProductDetail {
    return {
      ...this.toDomain(productDto),
      images: productDto.images,
      rating: productDto.rating,
      stock: productDto.stock,
      brand: productDto.brand ?? "Generic",
      sku: productDto.sku,
      tags: productDto.tags,
      availabilityStatus: productDto.availabilityStatus,
      warrantyInformation: productDto.warrantyInformation,
      shippingInformation: productDto.shippingInformation,
      returnPolicy: productDto.returnPolicy,
      minimumOrderQuantity: productDto.minimumOrderQuantity,
      reviews: productDto.reviews.map((r) => ({
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        reviewerName: r.reviewerName,
      })),
    };
  }

  toDomainList(productResponseDto: ProductResponseDTO): Paginated<Category> {
    const products = productResponseDto.products.map((p) => this.toDomain(p));
    return {
      items: { ...Object.groupBy(products, (p) => p.category) },
      limit: productResponseDto.limit,
      pages: Math.ceil(productResponseDto.total / productResponseDto.limit),
      skip: productResponseDto.skip,
      total: productResponseDto.total,
    };
  }
}
