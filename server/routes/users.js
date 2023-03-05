var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})



 
// Register to site
router.post("/api/register/", function(req, res) {
  const username = req.body.username
  const password = req.body.password
  console.log("Register to site as:", username + ", with password", password)

  User.findOne({username: req.body.username})
  .then((user) => {
    if(user) {
      console.log("User already exits")
      return res.send("User already exists")
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) throw err
          User.create({
            username: req.body.username,
            password: hash
          })
          console.log("User registered")
          return res.redirect("/login")
        })
      })
    }
  })
})

// Login to site
router.post("/api/login/", upload.none(), function(req, res) {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password
  console.log("Login on user:", username + ", with password", password)

  User.findOne({username: req.body.username})
  .then((user) => {
    if(!user) {
      console.log("User", username, "does not exist")
      return res.send("User does not exist")
    } else {                                                                                                                                 
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if (isMatch) {
          console.log("User found")
          const jwtPayLoad = {
            id: user._id,
            username: user.name
          }
          jwt.sign(
            jwtPayLoad,
            process.env.SECRET,
            {
              expiresIn: 120
            },
            (err, token) => {
              if(err) throw err
              res.json({success: true, token})
            }
          )
        } else {
          console.log("password does mot match")
        }
      })
    }
  })
})

router.post("/api/post", function(req, res) {
  const content = req.body.text
  console.log(content)
  Post.create({
    username: "Sisäänkirjautunut käyttäjä",
    text: content,
    comments: "Kommentti"
  })
  console.log("Post has been made")
  return res.send("Post has been made")
})

router.get("/api/post", function(req, res) {
  //console.log("lol")
  //return res.send("Item")
  Post.find({}).then(function(posts) {
    //console.log("löytyi?")
    //console.log(posts)
    return res.send(posts)
  })
})

router.post("/api/comment", function(req, res) {
  const comment = req.body.text
  const postId = req.body.postId
  console.log(req.body)
  Comment.create({
    postId: postId,
    username: "Username",
    text: comment
  })
  console.log("Comment has been made")
  return res.send("Comment has been made")
})

router.get("/api/comment", function(req, res) {
  //console.log("lol")
  //return res.send("Item")
  Comment.find({}).then(function(comments) {
    //console.log("löytyi?")
    //console.log(posts)
    return res.send(comments)
  })
})

module.exports = router;
