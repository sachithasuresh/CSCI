const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
    //adding this for checking verification. The added fields are a boolean and string used for whether a user has been verified.
    //
    //I'm thinking we set verifyStringGenerated as a String, and set the String to the Verification code we generate for the user.
    //
    //then, we have a verifyConfirmation boolean, which is a check as to whether the user successfully entered the code sent to them. Once this is flipped, their account is marked as "verified" and is checked on login. 
    //Until they are verified, they cannot login.  
  verifyStringGenerated: {
   type: String,
    required: true
  }
//  verifyConfirmation: {
//    type: Boolean,
//    required: true
//  }
});
module.exports = User = mongoose.model("users", UserSchema);