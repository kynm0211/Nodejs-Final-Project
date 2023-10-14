require('dotenv').config(); // Nạp biến môi trường từ tệp .env

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Sử dụng biến môi trường
        pass: process.env.EMAIL_PASSWORD, // Sử dụng biến môi trường
    },
});

sendEmail = (toEmail, subject, text) => {
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
module.exports = sendEmail;