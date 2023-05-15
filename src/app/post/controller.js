const posts = require("../../data/dummy-posts");
// Schema
const postSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "string" }, // Bottle, Paper, etc
    tags: { type: "array", items: { type: "string" } },
    quantity: { type: "number" },
    user: { type: "string" }, // Relation
    createdAt: { type: "string" },
    iamge: { type: "string" },
  },
};

const PostController = {
  async getAll(req, reply) {
    reply.send({
      data: {
        posts,
      },
    });
  },
  async getById(req, reply) {
    const { id } = req.params;
    const post = posts.find((post) => post.id === id);

    reply.send({
      data: { post },
    });
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
