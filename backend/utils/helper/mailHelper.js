const nodemailer = require("nodemailer");

async function sendMail(sendTo, subject, msg) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eduhub74@gmail.com',
      pass: process.env.MAIL_PWD
    }
  });

  var mailOptions = {
    from: 'eduhub74@gmail.com',
    to: sendTo,
    subject: subject,
    text: msg
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ' + error);
  }
}

module.exports = sendMail;
