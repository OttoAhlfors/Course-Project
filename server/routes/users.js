var express = require('express');
var router = express.Router();

// Database imports
const mongoose = require("mongoose")
const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")

// Imports for password encryption
const bcrypt = require("bcryptjs")

// Imports for the jwt token
const jwt = require("jsonwebtoken")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
 
// Register to site
router.post("/api/register/", function(req, res) {
  const username = req.body.username
  const password = req.body.password

  // We find the user by the username
  User.findOne({username: req.body.username})
  .then((user) => {
    
    // If the user exits we cannot register it
    if(user) {
      return res.json("User already exists")
    } else {

      // User doesnt exist so we encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) throw err

          // We create a new user
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

  // We find the user by username
  User.findOne({username: req.body.username})
  .then((user) => {

    // User by that name doesnt exist
    if(!user) {
      console.log("User", username, "does not exist")
      return res.json("User does not exist")
    } else {                          
      
      // User found we compare the passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if (isMatch) {

          // Passwords match we create and return the jwt token
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

// Create new post
router.post("/api/post", function(req, res) {
  const content = req.body.text
  Post.create({
    text: content,
  })
  console.log("Post has been made")
  return res.json("Post has been made")
})

// We get all the posts
router.get("/api/post", function(req, res) {
  Post.find({}).then(function(posts) {
    return res.send(posts)
  })
})

// Create a comment
router.post("/api/comment", function(req, res) {
  const comment = req.body.text
  const postId = req.body.postId
  Comment.create({
    postId: postId,
    text: comment
  })
  return res.json("Comment has been made")
})

// Get all the comments
router.get("/api/comment", function(req, res) {
  Comment.find({}).then(function(comments) {
    return res.send(comments)
  })
})

module.exports = router;
