import { describe, expect, it } from "vitest";
import { ProductResponseMapper } from "@/src/infrastructure/mappers/product-response-mapper";
import { ProductResponseDTO } from "@/src/infrastructure/dtos/product-dto";

type ProductDTO = ProductResponseDTO["products"][number];

const productDto: ProductDTO = {
  id: 1,
  title: "iPhone",
  description: "A phone",
  category: "smartphones",
  price: 999,
  discountPercentage: 10,
  thumbnail: "https://example.com/thumb.png",
  images: ["https://example.com/a.png", "https://example.com/b.png"],
  rating: 4.5,
  stock: 12,
  brand: "Apple",
  sku: "SKU1",
  tags: ["tech"],
  availabilityStatus: "In Stock",
  warrantyInformation: "1 year",
  shippingInformation: "Ships in 3 days",
  returnPolicy: "30 days",
  minimumOrderQuantity: 1,
  reviews: [
    { rating: 5, comment: "Great", date: "2024-01-01", reviewerName: "Ann" },
  ],
} as ProductDTO;

describe("ProductResponseMapper", () => {
  const mapper = new ProductResponseMapper();

  it("maps a DTO to a domain product using the thumbnail as image", () => {
    const product = mapper.toDomain(productDto);
    expect(product).toEqual({
      id: 1,
      title: "iPhone",
      description: "A phone",
      category: "smartphones",
      price: 999,
      discountPercentage: 10,
      image: "https://example.com/thumb.png",
    });
  });

  it("maps detail fields including reviews", () => {
    const detail = mapper.toDetail(productDto);
    expect(detail.images).toHaveLength(2);
    expect(detail.reviews).toEqual([
      { rating: 5, comment: "Great", date: "2024-01-01", reviewerName: "Ann" },
    ]);
  });

  it("falls back to a generic brand when missing", () => {
    const detail = mapper.toDetail({ ...productDto, brand: undefined } as ProductDTO);
    expect(detail.brand).toBe("Generic");
  });

  it("computes page count from total and limit", () => {
    const paginated = mapper.toDomainList({
      products: [productDto],
      total: 95,
      skip: 0,
      limit: 30,
    } as ProductResponseDTO);
    expect(paginated.pages).toBe(4); // ceil(95 / 30)
    expect(paginated.total).toBe(95);
  });

  it("groups products by category", () => {
    const paginated = mapper.toDomainList({
      products: [productDto, { ...productDto, id: 2, category: "laptops" }],
      total: 2,
      skip: 0,
      limit: 30,
    } as ProductResponseDTO);
    expect(Object.keys(paginated.items)).toEqual(
      expect.arrayContaining(["smartphones", "laptops"]),
    );
  });
});
