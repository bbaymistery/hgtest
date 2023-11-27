let nodemailer = require("nodemailer");
export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(allPickUpss);
    let template = `<div>
    <p>Type is :  ${req?.body?.response?.type} </p>
    <p>Msg is :  ${req?.body?.response?.msg} </p>
    <p>Name is :  ${req?.body?.response?.name} </p>
    <p>Note is :  ${req?.body?.response?.note} </p>

    </div>`;
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
      from: "info@heathrow-gatwick-transfers.com",
      to: "elgun.ezmemmedov@mai.ru",
      html: template,
      subject: "errorrr from hgt website mail",
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        res.status(403).json({ status: "ERROR", err });
        console.log(err);
      } else {
        res.status(200).json({ status: "OK", info });
        // resolve(info);
        console.log(info);
      }
    });
  }
}
