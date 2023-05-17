const postSerializer = (postRef) => ({
  id: postRef.id,
  ...postRef.data(),
  created_at: postRef.createTime.toDate(),
});

module.exports = postSerializer;
