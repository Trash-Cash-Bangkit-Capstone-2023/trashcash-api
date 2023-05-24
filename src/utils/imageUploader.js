const storage = require('../services/gcs')

async function upload(params) {
  try {
    const file = await params.file();
    if (!file) {
      console.log("No file uploaded");
      return;
    }
    const { filename, mimetype, file: stream } = file;
    const bucket = storage.bucket("trashcash-bucket-dev");
    const fileUpload = bucket.file(filename);
    stream
      .pipe(fileUpload.createWriteStream())
      .on("error", (err) => {
        return {
          status: 'error',
          message: err
        }
      })
      .on("finish", async () => {
        await fileUpload.makePublic();

        const url = `https://storage.googleapis.com/${bucketName}/${filename}`;

        return {
          status: "error",
          url: url,
        };
      });
  } catch (error) {
    console.error("Error uploading file:", err);
  }
}

module.exports = { upload };
