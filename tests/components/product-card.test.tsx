import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/src/presentation/components/product-list/ProductCard";
import { Product } from "@/src/domain/product";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    return <img src={props.src as string} alt={props.alt as string} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const product: Product = {
  id: 42,
  title: "Wireless Headphones",
  description: "Noise-cancelling over-ear headphones",
  category: "audio",
  price: 200,
  discountPercentage: 0,
  image: "https://example.com/headphones.png",
};

describe("ProductCard", () => {
  it("renders the title, category and image", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("audio")).toBeInTheDocument();
    expect(screen.getByAltText("Wireless Headphones")).toHaveAttribute("src", "https://example.com/headphones.png");
  });

  it("links to the product detail page", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/42");
  });

  it("shows only the price when there is no discount", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("shows discounted price, original price and percentage when discounted", () => {
    render(<ProductCard product={{ ...product, discountPercentage: 25 }} />);
    // 200 * (1 - 0.25) = 150
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByText(/-25%/)).toBeInTheDocument();
  });
});
