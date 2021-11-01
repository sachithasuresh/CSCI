var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanitatem.verify@gmail.com',
    pass: 'CSCI-P465Project'
  }
});

var mailOptions = {
  from: 'sanitatem.verify@gmail.com',
  to: 'maxharms@iu.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});