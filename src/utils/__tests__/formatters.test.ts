import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, slugify, truncateText } from "../formatters";

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
    expect(formatCurrency(0)).toBe("$0.00");
    expect(formatCurrency(99.99)).toBe("$99.99");
  });

  it("formats other currencies", () => {
    const result = formatCurrency(100, "EUR");
    expect(result).toContain("100.00");
  });
});

describe("truncateText", () => {
  it("truncates text longer than maxLength", () => {
    expect(truncateText("Hello World", 5)).toBe("Hello...");
  });

  it("returns original text when within maxLength", () => {
    expect(truncateText("Hi", 10)).toBe("Hi");
    expect(truncateText("Exact", 5)).toBe("Exact");
  });
});

describe("formatDate", () => {
  it("formats a Date object", () => {
    const date = new Date("2024-01-15T12:00:00.000Z");
    const result = formatDate(date);
    expect(result).toContain("2024");
    expect(result).toContain("15");
  });

  it("accepts a date string", () => {
    const result = formatDate("2024-06-01");
    expect(result).toContain("2024");
  });
});

describe("slugify", () => {
  it("converts a phrase to a URL slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("  Trailing Spaces  ")).toBe("trailing-spaces");
    expect(slugify("Special & Characters!")).toBe("special-characters");
  });
});
