const PostController = {
  async getAll(req, reply) {
    reply.send({ message: "Index" });
  },
  async getById(req, reply) {
    const { id } = request.params;
    reply.send({ message: "Show" });
  },
  async create(req, reply) {
    reply.send({ message: "Create" });
  },
  async update(req, reply) {
    const { id } = request.params;
    reply.send({ message: "Update" });
  },
};

module.exports = PostController;
