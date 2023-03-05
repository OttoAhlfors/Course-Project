var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})



 
// Register to site
router.post("/api/register/", function(req, res) {
  const username = req.body.username
  const password = req.body.password

  User.findOne({username: req.body.username})
  .then((user) => {
    if(user) {
      return res.json("User already exists")
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) throw err
          User.create({
            username: req.body.username,
            password: hash
          })
          return res.redirect("/login")
        })
      })
    }
  })
})

// Login to site
router.post("/api/login/", upload.none(), function(req, res) {
  const username = req.body.username
  const password = req.body.password

  User.findOne({username: req.body.username})
  .then((user) => {
    if(!user) {
      console.log("User", username, "does not exist")
      return res.json("User does not exist")
    } else {                                                                                                                                 
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if (isMatch) {
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
              console.log("loged in")
              res.json({success: true, token})
            }
          )
        } else {
          return res.json("Password does not match")
        }
      })
    }
  })
})

router.post("/api/post", function(req, res) {
  const content = req.body.text
  Post.create({
    text: content,
  })
  console.log("Post has been made")
  return res.json("Post has been made")
})

router.get("/api/post", function(req, res) {
  Post.find({}).then(function(posts) {
    return res.send(posts)
  })
})

router.post("/api/comment", function(req, res) {
  const comment = req.body.text
  const postId = req.body.postId
  Comment.create({
    postId: postId,
    text: comment
  })
  return res.json("Comment has been made")
})

router.get("/api/comment", function(req, res) {
  Comment.find({}).then(function(comments) {
    return res.send(comments)
  })
})

module.exports = router;
