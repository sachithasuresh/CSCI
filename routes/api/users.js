const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var code = require("../../validation/verifycodemaker.js");
var result = code.name;
//"True that user does not exist, send the email"
const mailFlag = false;
//const nodemailer = require("nodemailer");
const verify = require("../../validation/verifymailer.js");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const verifymailer = require("../../validation/verifymailer");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

//code generation function
function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = 12;
  for ( var i = 0; i < 12; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 console.log(result);
 return result;
}

code = makeid();

console.log("the code here is : " + code);

//Google login
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("751459423531-jj7aui68o6frbe6j9dien45e0m01tqpd.apps.googleusercontent.com")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  // Make the new user here, req.body is our "data" variable (see verifymailer.js to understand how that's used)
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
        mailFlag = false;
      } else {
        //mailFlag = true;
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          verifyStringGenerated: code
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
    //flag is set previously based on whether user exists or not. 
    console.log(code);  
    verify(req.body, code);
});

  // ---------------------------

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

router.post("/google" ,async (req, res) => {
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "751459423531-jj7aui68o6frbe6j9dien45e0m01tqpd.apps.googleusercontent.com"
  });
  const { name, email, picture } = ticket.getPayload();    
  const user = await User.updateOne({ 
      where: { email: email },
      update: { name, picture },
      create: { name, email, picture }
  })
  res.status(201)
  res.json(user)
});


  module.exports = router;