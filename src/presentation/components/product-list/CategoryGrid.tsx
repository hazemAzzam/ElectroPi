import { Product } from "@/src/domain/product";
import ProductCard from "./ProductCard";

export default function CategoryGrid({ category, products }: { category: string; products: Product[] }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold capitalize tracking-tight">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
