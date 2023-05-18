require("dotenv").config();
require("./services/firebase"); // Initialize firebase admin
const postRoutes = require("./app/post/routes");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const posts = require("./data/dummy-posts");
const users = require("./data/dummy-users");
const authRoutes = require("./app/auth/routes");
const profileRoutes = require("./app/profile/routes");

// Declare a route
fastify.register(cors, {
  origin: ["*"], // TODO : Change into domain or ip later on
});

fastify.get("/", async (request, reply) => {
  reply.send({ message: "Hello World" });
});

fastify.get("/user/:id", async (request, reply) => {
  const { id } = request.params;
  const data = users.find((item) => item.id == id);
  reply.code(200).send({
    message: "Success",
    data: {
      data,
    },
  });
});

fastify.get("/user/posts", async (request, reply) => {
  // const { id } = request.params;

  reply.code(200).send({
    message: "Success",
    data: {
      posts,
    },
  });
});
fastify.get("/user/posts/:id", async (request, reply) => {
  const { id } = request.params;
  const data = posts.find((item) => item.id == id);
  reply.code(200).send({
    message: "Success",
    data: {
      data,
    },
  });
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/multipart"));

fastify.register(postRoutes, { prefix: "/v1" });
fastify.register(authRoutes, { prefix: "/v1" });
fastify.register(profileRoutes, { prefix: "/v1" });

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
