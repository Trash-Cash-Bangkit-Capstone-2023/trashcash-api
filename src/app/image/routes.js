const ImageController = require("./controller");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const imageRoutes = async (fastify, options) => {
  fastify.addHook("onRequest", isAuthenticated);
  fastify.post("/image", ImageController.uploadImage);
};

module.exports = imageRoutes;
