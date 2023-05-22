const { firestore, auth } = require("../../services/firebase");
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
    const { user } = req;
    const { name, province, address, phone, email } = req.body;

    const userAuthRef = auth().updateUser(user.uid, {
      displayName: name,
      phoneNumber: phone,
      email,
      emailVerified: true,
    });

    const userRef = await firestore().collection("users").doc(user.uid).update({
      name,
      province,
      address,
      phone,
      email,
    });

    if (!userRef || !userAuthRef) {
      reply.status(500).send({
        errors: [
          {
            message: "Internal server error",
            error: { message: "Failed to update user" },
          },
        ],
      });
    }

    const updatedUserRef = await firestore()
      .collection("users")
      .doc(user.uid)
      .get();

    reply.send({
      message: "Success",
      data: {
        user: userSerializer(updatedUserRef),
      },
    });
    // TODO : Update image
  },
};

module.exports = ProfileController;
