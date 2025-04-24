import "dotenv/config";
import fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { registerRoutes } from "./src/routes/index.js";

const start = async () => {
  // Connect to MongoDB
  await connectDB(process.env.MONGO_URI);

  // Create Fastify app with logger
  const app = fastify({ logger: true });

  // Register your app routes
  await registerRoutes(app);

  // Test route
  app.get("/", async (req, reply) => {
    return { message: "Hello Server is running" };
  });

  // Start the server
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
