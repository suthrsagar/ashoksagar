import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix: prefix });
  fastify.register(orderRoutes, { prefix: prefix });
};
