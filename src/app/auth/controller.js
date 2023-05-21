const { userSerializer } = require("../../serializers");
const { auth, firestore } = require("../../services/firebase");

const AuthController = {
  async register(req, reply) {
    const { email, password, name, province, address, phone } = req.body;
    try {
      const registeredUser = await auth().createUser({
        email,
        password,
        displayName: name,
        phoneNumber: phone,
        emailVerified: true,
      });

      const userRef = await firestore()
        .collection("users")
        .doc(registeredUser.uid)
        .set({
          uid: registeredUser.uid,
          email,
          name,
          phone,
          province,
          address,
        });

      if (!userRef) {
        reply.status(500).send({
          errors: [
            {
              message: "Internal server error",
              error: { message: "Failed to create user" },
            },
          ],
        });
      }

      const user = await firestore()
        .collection("users")
        .doc(registeredUser.uid)
        .get();

      reply.code(201).send({
        message: "Success",
        data: {
          user: userSerializer(user),
        },
      });
    } catch (error) {
      console.error("Error register user :", error);
      reply.status(401).send({ message: "Registration failed", error });
    }
  },
};

module.exports = AuthController;
