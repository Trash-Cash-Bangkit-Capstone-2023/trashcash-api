const PostController = require("./controller");
const postRoutes = async (fastify, options) => {
  fastify.get("/posts", PostController.getAll);
  fastify.get("/posts/:id", PostController.getById);
  fastify.post("/posts", PostController.create);
  fastify.put("/posts/:id", PostController.update);
  fastify.delete("/posts/:id", PostController.delete);
};

module.exports = postRoutes;
