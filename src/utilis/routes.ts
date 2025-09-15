import { Product } from "../types/productTypes"; // adjust path if needed

export const getProductDetailRoute = (product: Product & { gender?: string }, basePath?: string) =>
  `${basePath ?? `/${(product as Product).gender ?? "mens"}`}/product/${product.id}`;
