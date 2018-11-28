const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cryptage_engine = require('../../crypt/cryptage');
const jwt = require("jsonwebtoken");


const User = require("../models/user").User;
//  route to signup
router.post("/signup", (req, res, next) => {
// we have to encrypt our password
  let req_email = req.body.email
  let req_password= req.body.password
  let crypt_pass = cryptage_engine.encrypt(req_password)

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req_email,
              password:crypt_pass
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });  
      }
    });






  });


//route for auth
router.post("/login",(req , res)=> {
  let req_email = req.body.email
  let req_password= req.body.password
  let crypt_pass = cryptage_engine.encrypt(req_password)
  
  User.find({email:req_email}).exec()
  .then(user => {
    console.log(user)


    if(user){
      console.log("we have a backdata");
      //we verifie the password into the DB and the password passed into form
      if ((crypt_pass === user[0].password) && (req_email === user[0].email)) {
        return res.status(200).json({
          message: "auth success"
        })
      }
      else{
        return res.status(200).json({message:"auth fail"})
      }
    }
    else{
      return res.status(200).json({message:"auth fail"})
    }
  })
  
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
      message:"login or pass dsnt match"
    });
    console.log(err)
  });

})
 

//route to delete user by id
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
