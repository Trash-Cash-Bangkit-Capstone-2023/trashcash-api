const storage = require("../services/gcs");

async function uploadFile(params) {
  const file = await params.file();
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file uploaded");
    }
    const { filename, mimetype, file: stream } = file;
    const bucket = storage.bucket("trashcash-project-bucket");
    const fileUpload = bucket.file(filename);
    stream
      .pipe(fileUpload.createWriteStream())
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", async () => {
        await fileUpload.makePublic();

        const url = `https://storage.googleapis.com/trashcash-project-bucket/${filename}`;

        resolve(url);
      });
  });
}

module.exports = { uploadFile };
