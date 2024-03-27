const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(mongo_URL);
}

const initDb = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner:"65f437d1efe5c1ba9bad1549"}));
  await listing.insertMany(initData.data);
  console.log("data was initialize");
};

initDb();
