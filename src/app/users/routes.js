const isAuthenticated = require("../../middlewares/isAuthenticated");
const usersController = require("./controller");

const usersRoutes = async (fastify, options) => {
  fastify.addHook("onRequest", isAuthenticated);
  fastify.get("/users/:id/posts", usersController.getUserPosts);
};

module.exports = usersRoutes;
