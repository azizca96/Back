const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Offer = require ("../models/offer");

//  route for getting offers

router.get("/",(req, res, next)=>{
  Offer.find()
  .exec()
  .then(docs => {
      console.log(docs);
      res.status(200).json({
          message:"get request successful",
          offers_list: docs
      })
  })
  .catch(err=> {
      console.log(err);
      res.status(500).json({
          error: err
      })
      
  })
})
// route for adding offers
router.post("/", (req , res, next)=>{
    const offer = new Offer ({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        requirements: req.body.requirements,
        salaire_interval: req.body.salaire_interval,
        location: req.body.location

    });
    offer
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"offer added successfully",
            offer_added: result
        })
        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

// getting a specific offer by id
router.get("/:offerId", (req, res, next) => {
    const id = req.params.offerId;
    Offer.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
// update by id
  router.patch("/:offerId", (req, res, next) => {
    const id = req.params.offerId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Offer.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/:offerId", (req, res, next) => {
    const id = req.params.offerId;
    Offer.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;