const router = require("express").Router();
const User = require("../model/user");
const bycrpt = require('bcrypt');
const { json } = require("express");


//Register

router.post("/register", async (req, res) => {

      try {
            // hash password like this & store to db $2b$10$8Y5Oj329TeEh8weYpJ
            const salt = await bycrpt.genSalt(10)
            const hashpassword = await bycrpt.hash(req.body.password, salt)

            const { username, email } = req.body

            const newUser = await new User({
                  username: username,
                  email: email,
                  password: hashpassword
            });

            //save user & return response
            const user = await newUser.save();
           return res.json(user)

      } catch (err) {
            res.status(400).send(err.message)
      }

});

router.post("/login", async (req, res) => {
      try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.json("User not found")

            const validPassword = await bycrpt.compare(req.body.password, user.password)
            !validPassword && res.json("wrong password ")

            // res.status(200).json(user)
            return res.status(200).json(user)

      } catch (err) {
            //res.json(err)
            res.status(400).send(err.message)
      }
})

module.exports = router