const isAuthenticated = require("../../middlewares/isAuthenticated");
const tagController = require("./controller");

const tagRoutes = async (fastify, options) => {
  fastify.addHook("onRequest", isAuthenticated);
  fastify.get("/tags", tagController.getAll);
};

module.exports = tagRoutes;
