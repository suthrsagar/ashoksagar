import "dotenv/config";
import fastify from "fastify";
import { PORT, MONGO_URI } from "./src/config/config.js";
 
import { connectDB } from "./src/config/connect.js";
import fastify from "fastify";
import { registerRoutes } from "./src/routes/index.js";

const app = fastify({ logger: true });

const start = async () => {
  try {
    await registerRoutes(app);

    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server started on port 3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
