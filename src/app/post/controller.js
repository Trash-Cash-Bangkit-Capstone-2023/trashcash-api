const { firestore } = require("firebase-admin");
const { userSerializer, postSerializer } = require("../../serializers");
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

const getRandomNumber = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const PostController = {
  async getAll(req, reply) {
    // TODO : Create search by tags
    // TODO : Create search by category
    const postsRef = await firestore().collection("posts").get();
    const userIds = postsRef.docs.map((doc) => doc.data().user_id);

    const usersRef = await firestore()
      .collection("users")
      .where("id", "in", userIds)
      .get();

    const users = usersRef.docs.map((doc) => userSerializer(doc));
    const posts = postsRef.docs.map((doc) => ({
      ...postSerializer(doc),
      user: users.find((user) => user.id === doc.data().user_id),
    }));

    reply.send({
      data: {
        posts,
      },
    });
  },
  async getById(req, reply) {
    const { id } = req.params;
    const postRef = await firestore().collection("posts").doc(id).get();
    if (!postRef.exists) {
      reply.status(404).send({
        errors: [{ message: "Post not found" }],
      });
    }
    const userRef = await firestore()
      .collection("users")
      .doc(postRef.data().user_id)
      .get();
    const user = userSerializer(userRef);
    const post = {
      ...postSerializer(postRef),
      user,
    };

    reply.send({
      data: { post },
    });
  },
  async create(req, reply) {
    const { title, description, category, tags, quantity, user_id, image } =
      req.body;

    // TODO : Add upload to storage bucket function here
    const image_url = `https://picsum.photos/500?random=${getRandomNumber()}`;

    // Validation
    if (!title || !description || !category || !tags || !quantity || !user_id) {
      reply.status(400).send({
        errors: [{ message: "Bad request" }],
      });
    }

    const postRef = await firestore().collection("posts").add({
      title,
      description,
      category,
      tags,
      quantity,
      user_id,
      created_at: firestore.FieldValue.serverTimestamp(),
      image_url,
    });

    if (!postRef) {
      reply.status(500).send({
        errors: [{ message: "Internal server error" }],
      });
    }

    const post = await postRef.get();
    const userRef = await firestore().collection("users").doc(user_id).get();
    const user = userSerializer(userRef);
    reply.code(201).send({
      message: "Success",
      data: {
        post: { ...postSerializer(post), user },
      },
    });
  },
  async update(req, reply) {
    const { id } = req.params;
    const { title, description, category, tags, quantity, image } = req.body;

    // TODO : Add upload to storage bucket function here
    const image_url = `https://picsum.photos/500?random=${getRandomNumber()}`;

    // Validation
    if (!title || !description || !category || !tags || !quantity) {
      reply.status(400).send({
        errors: [{ message: "Bad request" }],
      });
    }

    const postRef = await firestore().collection("posts").doc(id).get();
    if (!postRef.exists) {
      reply.status(404).send({
        errors: [{ message: "Post not found" }],
      });
    }

    const updatedPostRef = await firestore()
      .collection("posts")
      .doc(id)
      .update({
        title,
        description,
        category,
        tags,
        quantity,
        image_url,
      });

    if (!updatedPostRef) {
      reply.status(500).send({
        errors: [{ message: "Internal server error" }],
      });
    }

    const updatedPost = await firestore().collection("posts").doc(id).get();
    const userRef = await firestore()
      .collection("users")
      .doc(updatedPost.data().user_id)
      .get();
    const user = userSerializer(userRef);

    reply.code(200).send({
      message: "Success",
      data: {
        post: { ...postSerializer(updatedPost), user },
      },
    });
  },
  async delete(req, reply) {
    const { id } = req.params;

    const postRef = await firestore().collection("posts").doc(id).get();
    if (!postRef.exists) {
      reply.status(404).send({
        errors: [{ message: "Post not found" }],
      });
    }

    const deletedPostRef = await firestore()
      .collection("posts")
      .doc(id)
      .delete();

    if (!deletedPostRef) {
      reply.status(500).send({
        errors: [{ message: "Internal server error" }],
      });
    }

    reply.code(200).send({
      message: "Success",
      data: {
        post: { ...postSerializer(postRef) },
      },
    });
  },
};

module.exports = PostController;
