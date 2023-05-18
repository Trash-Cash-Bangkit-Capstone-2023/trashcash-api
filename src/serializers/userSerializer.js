const userSerializer = (userRef) => {
  return {
    uid: userRef.id,
    name: userRef.data().name,
    address: userRef.data().address,
    city: userRef.data().city,
    phone: userRef.data().phone,
    email: userRef.data().email,
    created_at: userRef.createTime.toDate(),
  };
};

module.exports = userSerializer;
