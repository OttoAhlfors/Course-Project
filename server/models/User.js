// Model for the user database
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: String,
    password: String
})

module.exports = mongoose.model("Users", userSchema);