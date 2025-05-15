import { getProductsByCategoryId } from "../controllers/products/product.js";

export const productRoutes = async (fastify) => {
  fastify.get("/category/:categoryId", getProductsByCategoryId);
};
