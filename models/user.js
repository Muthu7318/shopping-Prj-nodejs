const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("user saved");
      })
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({
        _id: new mongodb.ObjectId(userId),
      })
      .then()
      .catch((err) => console.log(err));
  }
}

module.exports = User;
