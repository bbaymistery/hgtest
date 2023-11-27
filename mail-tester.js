let nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
var template = fs.readFileSync(
  path.resolve(__dirname, "./mail-template.html"),
  "utf-8"
);
template = template.replace("__title__", "hello World");
template = template.replace("__message___", "just for test");
const transporter = nodemailer.createTransport({
  name: "mail.aplcars.com",
  host: "mail.aplcars.com",
  port: 465,
  secure: true,
  auth: {
    user: "laith@aplcars.com",
    pass: "Istanbul2021!-",
  },
  tls: { rejectUnauthorized: false },
});

const mailData = {
  from: "laith@aplcars.com",
  to: "elgun1993-93@bk.ru",
  subject: `Booking 465468432 heathrow-gatwick-transfers.com`,
  html: template,
};
(() => {
  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
})();
