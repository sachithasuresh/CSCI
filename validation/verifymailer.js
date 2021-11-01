//server side verification
var nodemailer = require('nodemailer');

module.exports = function sendMail(data, code) {
  //make the transporter
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sanitatem.verify@gmail.com',
      pass: 'CSCI-P465Project'
    }
  });
  //set the receivers email in here an the sender as us
  var mailOptions = {
    from: 'verify.sanitatem@gmail.com',
    to: data.email,
    subject: 'Please Verify your Sanitatem Email',
    text: 'Please enter code ' + code + ' for verification.'
  };
  //perform the sending and log any errors or success messages
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    } 
  });
};


