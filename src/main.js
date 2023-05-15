require("dotenv").config();
const postRoutes = require("./app/post/routes");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

// Declare a route
fastify.register(cors, {
  origin: ["*"],
});

fastify.get("/", async (request, reply) => {
  reply.code(200).send({ message: "Hello from Trash Cash!" });
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
