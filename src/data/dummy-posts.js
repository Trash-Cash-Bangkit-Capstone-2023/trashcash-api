const dummyUsers = require("./dummy-users");

const dummyPosts = [
  {
    id: "1",
    title: "Sampah Botol Siap Daur Ulang",
    description:
      "Dijual sampah botol berjumlah 3kg jika ingin membeli bisa contact saya 🤙",
    category: "Bottle",
    tags: ["Bottle", "Plastic"],
    quantity: 3,
    user: dummyUsers[0],
    createdAt: "2021-01-01T00:00:00.000Z",
    image: "https://picsum.photos/500?random=1",
  },
  {
    id: "2",
    title: "Sampah Kertas Siap Daur Ulang",
    description:
      "Dijual sampah kertas berjumlah 3kg jika ingin membeli bisa contact saya 🤙",
    category: "Paper",
    tags: ["Paper", "Plastic"],
    quantity: 3,
    user: dummyUsers[1],
    createdAt: "2021-01-01T00:00:00.000Z",
    image: "https://picsum.photos/500?random=2",
  },
  {
    id: "3",
    title: "Sampah Kaca 1kg",
    description:
      "Dijual sampah kaca berjumlah 1kg jika ingin membeli bisa contact saya 🤙",
    category: "Glass",
    tags: ["Glass", "Plastic"],
    quantity: 1,
    user: dummyUsers[2],
    createdAt: "2021-01-01T00:00:00.000Z",
    image: "https://picsum.photos/500?random=3",
  },
];

module.exports = dummyPosts;
