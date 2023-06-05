const { firestore } = require("../../services/firebase");

const tagController = {
  async getAll(req, reply){
    let query = firestore().collection("posts");

    const postsRef = await query.get();
    const uniqueTags = new Set()
    postsRef.forEach((doc) => {
      const post = doc.data();
      const tags = post.tags;
      tags.forEach((tag) => uniqueTags.add(tag));
    })
    const uniqueTagsArray = Array.from(uniqueTags);
    reply.send({
      data: uniqueTagsArray,
    });
  }
};

module.exports = tagController;