const imageUploader = require("../../utils/imageUploader");

const ImageController = {
  async uploadImage(req, reply) {
    try {
      // Upload the file
      const imageUrl = await imageUploader.uploadFile(req);

      // Log the imageUrl
      reply.code(200).send({
        message: "Success",
        data: {
          url: imageUrl,
        },
      });
    } catch (err) {
      console.error("Error uploading file:", err);
      reply.status(500).send({
        errors: [{ message: "Internal server error" }],
      });
    }
  },
};

module.exports = ImageController;
