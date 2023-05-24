const ImageController = require("./controller");

const imageRoutes = async (fastify, options) => {
  fastify.post("/image", ImageController.uploadImage);
};

module.exports = imageRoutes;
