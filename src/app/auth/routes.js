const AuthController = require("./controller");

const authRoutes = async (fastify, options) => {
  fastify.post("/auth/register", AuthController.register);
};

module.exports = authRoutes;
