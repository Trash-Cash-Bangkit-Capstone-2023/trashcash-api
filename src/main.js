require("dotenv").config();
require("./services/firebase"); // Initialize firebase admin
const postRoutes = require("./app/post/routes");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

// Declare a route
fastify.register(cors, {
  origin: ["*"], // TODO : Change into domain or ip later on
});

fastify.get("/", async (request, reply) => {
  reply.send({ message: "Hello World" });
});

fastify.register(postRoutes, { prefix: "/v1" });

// Run the server!
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";

const start = async () => {
  try {
    await fastify.listen({ host: HOST, port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
