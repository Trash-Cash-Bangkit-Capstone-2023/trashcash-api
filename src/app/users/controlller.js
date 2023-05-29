const { firestore, auth } = require("../../services/firebase");
const { userSerializer } = require("../../serializers");

const usersController = {
  async getUserPosts(req, reply) {
    const { user } = req;
    const userRef = await firestore().collection("users").doc(user.uid).get();
    reply.send({
      message: "Success",
      data: {
        user: userSerializer(userRef),
      },
    });
  },
};

module.exports = usersController;
