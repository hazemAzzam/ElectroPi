export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  image: string;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductDetail extends Product {
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  tags: string[];
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  reviews: ProductReview[];
}
