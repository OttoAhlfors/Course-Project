const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    username: String,
    text: String,
    comments: [String]
})

module.exports = mongoose.model("Posts", postSchema);