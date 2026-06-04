import { describe, expect, it } from "vitest";
import { formatDate, formatPrice } from "@/src/presentation/lib/utils";

describe("formatPrice", () => {
  it("formats a number as USD currency", () => {
    const formatted = formatPrice(19.99);
    expect(formatted).toContain("$");
    expect(formatted).toContain("19.99");
  });

  it("renders zero", () => {
    expect(formatPrice(0)).toContain("0.00");
  });
});

describe("formatDate", () => {
  it("formats a valid ISO date", () => {
    expect(formatDate("2024-01-15T00:00:00.000Z")).not.toBe("");
  });

  it("returns an empty string for an invalid date", () => {
    expect(formatDate("not-a-date")).toBe("");
  });
});
