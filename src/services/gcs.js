const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "trashcash-project",
  keyFilename: "./src/serviceAccountCloudStorage.json", // Replace with your own service account key
});
module.exports = storage;
