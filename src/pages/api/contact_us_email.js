let nodemailer = require("nodemailer");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { message, email, phone, subject, fullname } = req.body.formValue;
      let htmlTemplate = `

        <div style="float: left;width: 650px;margin-left:5%">
             <div style="float: left; width: 650px;">
              <!--maaaaaaaaaaargin topppppppppppppppppppppppppppppppppp-->
                      <div
                style="float: left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;margin-top:5rem">
            </div>



          <!-- passenger details  startttt-->
            <div style="float: left;width: 650px;">
                <table width="650" border="1" cellpadding="0" cellspacing="0"
                    style="border-collapse:collapse;font-size: 12px;">
                    <tbody>
                        <tr style="width:100%;">
                            <th colspan="2" style="background-color:#2d59d4;font-size:20px;padding:5px;color:white">

                                Details
                            </th>
                        </tr>
                    </tbody>
                    <tbody>

                        <tr style="width:100%;">
                            <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Full Name
                            </td>
                            <td style="padding:2px;padding-left: 3px">${fullname}</td>
                        </tr>

                        <tr style="width:100%;">
                            <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Contact Number</td>
                            <td style="padding:2px;padding-left: 3px">${phone} </td>
                        </tr>
                        <tr style="width:100%;">
                            <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Email Address</td>
                            <td style="padding:2px;padding-left: 3px"><a href="">${email}</a>
                            </td>
                        </tr>
                        <tr style="width:100%;">
                            <td style="font-weight:bold;max-width: 200px !important;padding-left: 3px">Note
                            </td>
                            <td style="padding:2px;padding-left: 3px ;max-width: 445px;word-break: break-all;">
                                <a
                                    href="">${message}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>




            <!-- fioooter-->
            <div
                style="float:left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;">
                <span><br>Heathrow Gatwick Transfers <br>Challenge House,
                    <br>616 Mitcham Road ,
                    <br>Croydon, Surrey ,
                    <br>CR0 3AA
                    <br>Tel: <span class="js-phone-number">+44 208 683 2330</span>,
                    <br>Website:
                    <a href="http://www.heathrow-gatwick-transfers.com"
                        target="_blank">www.heathrow-gatwick-transfers.com</a>,
                    <br>Email enquiries:
                    <a href="//e.mail.ru/compose/?mailto=mailto%3ainfo@aplcars.com%3fsubject%3dEnquiries"
                        target="_blank" rel=" noopener noreferrer">
                        info@heathrow-gatwick-transfers.com
                    </a>
                </span>
            </div>
            <div
                style="float:left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;">
                <span><br><span style="float:left;width:100%;width:32px;height:32px;margin-right:5px;"><a
                            href="https://www.facebook.com/AirportPickupsLondon" title="Airport Pickups London Facebook"
                            target="_blank" rel=" noopener noreferrer"><img
                                src="https://proxy.imgsmail.ru?e=1657792655&amp;email=elgun1993-93%40bk.ru&amp;flags=0&amp;h=6l3DFQvSS2JthXuMLYeqYA&amp;is_https=1&amp;url173=d3d3LmFpcnBvcnQtcGlja3Vwcy1sb25kb24uY29tL0Nzcy9pbWcvZmIuZ2lm"
                                alt="Airport Pickups London Facebook" width="32" height="32"></a></span><span
                        style="width:100%;width:32px;height:32px;margin-right:5px;"><a
                            href="https://twitter.com/Airport_Pickups" title="Airport Pickups London Twitters"
                            target="_blank" rel=" noopener noreferrer"><img
                                src="https://proxy.imgsmail.ru?e=1657792655&amp;email=elgun1993-93%40bk.ru&amp;flags=0&amp;h=DHOFnrOd5xmwNTWN2mLk9A&amp;is_https=1&amp;url173=d3d3LmFpcnBvcnQtcGlja3Vwcy1sb25kb24uY29tL0Nzcy9pbWcvdHcuZ2lm"
                                alt="Airport Pickups London Twitters" width="32" height="32"></a></span> </span></div>
                  </div>
    </div>
      `;
      // console.log({ message, email, phone, subject, fullname });

      const transporter = nodemailer.createTransport({
        name: "mail.heathrow-gatwick-transfers.com",
        host: "mail.heathrow-gatwick-transfers.com",
        port: 25,
        secure: false,
        auth: {
          user: "info@heathrow-gatwick-transfers.com",
          pass: "3brothers",
        },
        tls: { rejectUnauthorized: false },
      });

      const mailData = {
        from: "info@heathrow-gatwick-transfers.com",
        to: "info@heathrow-gatwick-transfers.com",
        subject: subject,
        html: htmlTemplate,
      };
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        });
      });
      res.status(200).json({ status: "OK" });
    }
  } catch (error) {
    console.log(error);
  }
}

// export default function sendTestEmail(
//   params = {},
//   options = {},
//   callback = () => {}
// ) {
//   let { html, subject } = params;
//   console.log(params);
//   console.log(subject);

//   let template = `salam`;
//   const transporter = {
//     name: "mail.heathrow-gatwick-transfers.com",
//     host: "mail.heathrow-gatwick-transfers.com",
//     port: 25,
//     secure: false,
//     auth: {
//       user: "info@heathrow-gatwick-transfers.com",
//       pass: "3brothers",
//     },
//     tls: { rejectUnauthorized: false },
//   };
//   const mail = {
//     from: `"Heathrow Gatwick Transfers" <info@heathrow-gatwick-transfers.com>`,
//     to: "laith.errors@gmail.com",
//     subject: subject,
//     html: template,
//   };

//   let transporterNodeMailer = nodemailer.createTransport(transporter);
//   transporterNodeMailer.sendMail(mail, (error, res) => {
//     if (!error) {
//       callback({ status: env.status.success });
//     } else {
//       callback({ status: env.status.internalServerError, error });
//     }
//   });
// }
