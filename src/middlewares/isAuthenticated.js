const { auth } = require("../services/firebase");

const isAuthenticated = async (request, reply) => {
  try {
    const decodedToken = await auth().verifyIdToken(
      request.headers.authorization,
    );
    request.user = decodedToken;

    // Continue processing the request
  } catch (error) {
    console.error("Error verifying token:", error);
    reply.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
