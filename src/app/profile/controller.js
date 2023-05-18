const { firestore } = require("../../services/firebase");
const { userSerializer } = require("../../serializers");

const ProfileController = {
  async me(req, reply) {
    const { user } = req;
    const userRef = await firestore().collection("users").doc(user.uid).get();
    reply.send({
      message: "Success",
      data: {
        user: userSerializer(userRef),
      },
    });
  },
  async update(req, reply) {
    // TODO : Update details
    // TODO : Update image
  },
};

module.exports = ProfileController;
