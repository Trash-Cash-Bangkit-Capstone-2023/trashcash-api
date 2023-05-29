const { firestore } = require("../../services/firebase");
const { postSerializer } = require("../../serializers");

const usersController = {
  async getUserPosts(req, reply) {
    const { id } = req.params;
    const postsRef = await firestore().collection("posts").where('user_uid', "==", id).get();
    if (postsRef.empty) {
      reply.status(404).send({
        errors: [{ message: "Post not found" }],
      });
    }
    const posts = postsRef.docs.map((doc) => ({
      ...postSerializer(doc),
    }));

    reply.send({
      data: {
        posts,
      },
    });
  },
};

module.exports = usersController;
