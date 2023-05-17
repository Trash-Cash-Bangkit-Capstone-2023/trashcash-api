const userSerializer = (userRef) => {
  return {
    id: userRef.id,
    name: userRef.data().name,
    created_at: userRef.createTime.toDate(),
  };
};

module.exports = userSerializer;
