const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    postId: String,
    username: String,
    text: String
})

module.exports = mongoose.model("Comments", commentSchema);