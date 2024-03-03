const express = require("express");
const jswt = require("jsonwebtoken");
const secutritykey = "This is the security key";

// creating an middleware function for fetching user from the user auth token

function fetchUser(req, res, next) {
  const authToken = req.header("auth-token");
  console.log("Auth token found : ", authToken)
  const verification = jswt.verify(authToken, secutritykey)
  if(!verification){
    res.send("Please send a valid token")
  }
  req.user = verification.userid
  console.log('User foud ', req.user)
  next()

}

module.exports = fetchUser