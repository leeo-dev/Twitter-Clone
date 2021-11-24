const mongoose = require("mongoose");
class Database {
  #query;
  constructor(query) {
    this.#query = query;
    this.#connect(this.#query);
  }
  #connect(query) {
    mongoose
      .connect(query)
      .then(() => {
        console.log("Db connect successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new Database("mongodb://127.0.0.1:27017/TwitterClone");
