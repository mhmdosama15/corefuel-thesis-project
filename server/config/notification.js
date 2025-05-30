import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};
