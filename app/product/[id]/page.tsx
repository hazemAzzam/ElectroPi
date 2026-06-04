import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/src/presentation/actions/get-product";
import Container from "@/src/presentation/layout/Container";
import BackLink from "@/src/presentation/components/product/BackLink";
import ProductGallery from "@/src/presentation/components/product/ProductGallery";
import ProductInfo from "@/src/presentation/components/product/ProductInfo";
import ProductReviews from "@/src/presentation/components/product/ProductReviews";

type Props = {
  params: Promise<{ id: string }>;
};

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseId((await params).id);
  if (id === null) return { title: "Product not found" };

  const result = await getProduct(id);
  if (!result.ok) return { title: "Product not found" };

  return {
    title: result.product.title,
    description: result.product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const id = parseId((await params).id);
  if (id === null) notFound();

  const result = await getProduct(id);
  if (!result.ok) {
    if (result.notFound) notFound();
    return (
      <Container className="py-10">
        <p className="text-red-500">{result.error}</p>
      </Container>
    );
  }

  const product = result.product;

  return (
    <Container className="space-y-10 py-8">
      <BackLink />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <ProductReviews reviews={product.reviews} />
    </Container>
  );
}
