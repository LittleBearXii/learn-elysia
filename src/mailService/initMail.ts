const nodemailer = require("nodemailer");
import { MailOptions } from "../models/mailOptions";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "xxxxx@gmail.com", // your email
      pass: "xxxxxxxxxxxxxx", // your password
    },
  });

const sendMailAsync = async (mailOptions: MailOptions) => {
    const response = await transporter.sendMail(mailOptions);

    return response;
}

export default sendMailAsync;