import { categoriesRoutes } from "./categories.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(categoriesRoutes, { prefix: `${prefix}/categories` });
  // यहाँ और routes भी रजिस्टर करें अगर हैं
};
