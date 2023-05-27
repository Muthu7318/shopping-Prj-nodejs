const mongodb = require("mongodb");
const { MongoClient } = mongodb;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://nmuthukumaranm:xYuGgQijBQvUp836@cluster0.jw0cqeq.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected to MongoDb");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found !!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
