// TODO : GET /posts -> Create index post route with search by tags
// TODO : GET /posts/:id -> Create show post route
// TODO : POST /posts/:id -> Create update post route
// TODO : UPDATE /posts/:id -> Create delete post route

const PostController = require("./controller");
const postRoutes = async (fastify, options) => {
  fastify.get("/posts", PostController.getAll);
  fastify.get("/posts/:id", PostController.getById);
  fastify.post("/posts", PostController.create);
  fastify.put("/posts/:id", PostController.update);
};

module.exports = postRoutes;
