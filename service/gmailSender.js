const nodemailer = require("nodemailer");

module.exports = (app) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "eservice240@gmail.com", 
      pass: "matkhau123", 
    },
  });


  const sendEmail = (toEmail, subject, text) => {
    const mailOptions = {
      from: "Service", 
      to: toEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  // Gửi email với liên kết đăng nhập
  app.post("/api/admin/send-login-link", (req, res) => {
    const { toEmail, loginLink } = req.body;

    const subject = "Welcome to Our System";
    const text = `Welcome to our system! Please click on the following link to set your password and log in: ${loginLink}`;

    sendEmail(toEmail, subject, text);

    return res.json({ message: "Email sent successfully" });
  });
};
