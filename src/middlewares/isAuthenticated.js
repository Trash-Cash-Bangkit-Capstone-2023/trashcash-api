const { auth } = require("../services/firebase");

const isAuthenticated = async (request, reply) => {
  if (!request.headers.authorization) {
    reply.status(401).send({ code: 401, message: "Unauthorized" });
  }

  const [, token] = request.headers.authorization.split("Bearer ");
  try {
    const decodedToken = await auth().verifyIdToken(token);
    request.user = decodedToken;

    // Continue processing the request
  } catch (error) {
    console.error("Error verifying token:", error);
    reply.status(401).send({ code: 401, message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
