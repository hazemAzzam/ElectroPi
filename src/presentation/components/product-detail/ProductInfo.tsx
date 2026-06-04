import { ProductDetail } from "@/src/domain/product";
import { cn, formatPrice } from "@/src/presentation/lib/utils";
import { PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import StarRating from "@/src/presentation/components/shared/StarRating";

export default function ProductInfo({ product }: { product: ProductDetail }) {
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount ? product.price * (1 - product.discountPercentage / 100) : product.price;
  const inStock = product.stock > 0;

  const highlights = [
    { icon: Truck, label: product.shippingInformation },
    { icon: ShieldCheck, label: product.warrantyInformation },
    { icon: RotateCcw, label: product.returnPolicy },
    { icon: PackageCheck, label: product.availabilityStatus },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.brand} · {product.category}
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight">{product.title}</h1>
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(2)} · {product.reviews.length} review
            {product.reviews.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-3xl font-semibold">{formatPrice(finalPrice)}</span>
        {hasDiscount && (
          <>
            <span className="text-base text-muted-foreground line-through">{formatPrice(product.price)}</span>
            <span className="mb-1 rounded-md bg-destructive/10 px-2 py-0.5 text-sm font-medium text-destructive">-{Math.round(product.discountPercentage)}%</span>
          </>
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <div className="flex items-center gap-2 text-sm">
        <span className={cn("inline-block size-2 rounded-full", inStock ? "bg-emerald-500" : "bg-destructive")} />
        <span className={inStock ? "text-foreground" : "text-destructive"}>{inStock ? `In stock — ${product.stock} available` : "Out of stock"}</span>
      </div>

      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground capitalize">
              {tag}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-2 grid grid-cols-1 gap-3 border-t pt-5 sm:grid-cols-2">
        {highlights.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-start gap-2.5">
            <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </dl>

      <p className="text-xs text-muted-foreground/70">SKU: {product.sku}</p>
    </div>
  );
}
