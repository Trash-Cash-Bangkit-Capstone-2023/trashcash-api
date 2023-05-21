const userSchema = {
  id: Number,
  name: String,
  email: String,
  phone: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  province: String,
  province: String,
  address: String,
};

const dummyUsers = [
  {
    id: 1,
    name: "Meyra",
    email: "meyra@gmail.com",
    phone: "+6298210312",
    password: "",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
  },
  {
    id: 2,
    name: "Adi Sudirta",
    email: "adisudirta@gmail.com",
    password: "",
    phone: "+628123456789",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
  },
  {
    id: 3,
    name: "Rezaldi",
    email: "rezaldi@gmail.com",
    password: "",
    phone: "+628123456789",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
  },
  {
    id: 4,
    name: "Fathia",
    email: "fathia@gmail.com",
    password: "",
    phone: "+628123456789",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
  },
];

module.exports = dummyUsers;
