const isAuthenticated = require("../../middlewares/isAuthenticated");
const ProfileController = require("./controller");

const profileRoutes = async (fastify, options) => {
  fastify.addHook("onRequest", isAuthenticated);
  fastify.get("/profile", ProfileController.me);
  fastify.put("/profile", ProfileController.update);
};

module.exports = profileRoutes;
