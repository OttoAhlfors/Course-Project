// Model for the post database
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    text: String,
})

module.exports = mongoose.model("Posts", postSchema);