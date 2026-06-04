import Image from "next/image";
import Link from "next/link";
import { Product } from "@/src/domain/product";
import { Card, CardContent, CardFooter, CardTitle } from "@/src/presentation/components/ui/card";
import { formatPrice } from "@/src/presentation/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
    <Card
      size="sm"
      className="group h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
        <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">{product.title}</CardTitle>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <span className="font-medium">{formatPrice(finalPrice)}</span>
        {hasDiscount && (
          <>
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
            <span className="ml-auto text-xs font-medium text-destructive">
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </CardFooter>
    </Card>
    </Link>
  );
}
