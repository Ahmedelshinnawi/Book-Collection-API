const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        else{
            const user = new User ({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            });
            user.save()
            .then(result => {
                console.log(result);
                 res.status(201).json({
                  message: "User created successfully",
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
        };
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: "User deleted successfully",
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