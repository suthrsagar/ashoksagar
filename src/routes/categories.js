import { getProductsByCategoryId } from "../controllers/products.js";

export const categoriesRoutes = async (fastify, options) => {
  // यह रूट `/api/categories/products/:categoryId` को हैंडल करेगा
  fastify.get("/products/:categoryId", getProductsByCategoryId);
};
