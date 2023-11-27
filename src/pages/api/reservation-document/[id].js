export default function handler(req, res) {
  let htmlTemplate = null;
  if (req.method === "POST") {
    htmlTemplate = `
       <div style="float: left;width: 650px; print-color-adjust: exact;">
           <div style="float: left; width: 650px;">
                               <!--    transferrrrrr  -->
                                             <!-- passenger details  startttt-->
                                   <div style="float: left;width: 650px;">
                                      <table width="650" border="1" cellpadding="0" cellspacing="0"
                                          style="border-collapse:collapse;font-size: 12px;">
                                                 <tbody>
                                                       <tr style="width:100%;">
                                                           <th colspan="2" style="background-color:#056bb8;font-size:20px;padding:5px;color:white">
                                                               Passenger
                                                               Details
                                                           </th>
                                                       </tr>
                                                   </tbody>
                                                <tbody>
                                                 <tr style="width:100%;">
                                                     <td style="font-weight:bold;width: 200px !important;padding-left: 3px;">Reference Number
                                                     </td>
                                                     <td style="padding:2px;padding-left: 3px ;width: 450px !important">${
                                                       req.body.reservId[0][0]
                                                     }</td>
                                                 </tr>
                                                 <tr style="width:100%;">
                                                     <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Lead Passenger Name
                                                     </td>
                                                     <td style="padding:2px;padding-left: 3px;width: 450px !important">${
                                                       req.body.reservations[0]
                                                         ?.passengerDetails
                                                         ?.firstname
                                                     } </td>
                                                 </tr>
                                                 <tr style="width:100%;">
                                                     <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Number of Passengers
                                                     </td>
                                                     <td style="padding:2px;width:450px !important">${
                                                       req.body.reservations[0]
                                                         ?.transferDetails
                                                         ?.passengersNumber
                                                     } </td>
                                                 </tr>
                                                 <tr style="width:100%;">
                                                     <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                    Contact Number
                                                     </td>
                                                     <td style="padding:2px;padding-left: 3px;width: 450px !important">  ${
                                                       req.body.reservations[0]
                                                         ?.passengerDetails
                                                         ?.phone
                                                     }</td>
                                                 </tr>
                                                 <tr style="width:100%;">
                                                     <td style="font-weight:bold;width: 200px !important;padding-left: 3px">Email Address</td>
                                                     <td style="padding:2px;padding-left: 3px;width: 450px !important"><a href="/compose?To=elgun1993%2d93@bk.ru">${
                                                       req.body.reservations[0]
                                                         ?.passengerDetails
                                                         ?.email
                                                     }
                                                     </a>
                                                     </td>
                                                 </tr>
                                             </tbody>
                                      </table>
                                  </div>

<!--transfer pick drop pointssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss -->
                                    <div style="float: left;width: 650px; ">
                                        <table width="650" border="1" class="xtable_mr_css_attr" cellpadding="0" cellspacing="0"
                                            style="border-collapse:collapse;font-size: 12px;margin-top:10px;">
                                               <tbody>
                                                       <tr style="padding:5px;width:100%;background-color:#056bb8;font-size:20px;padding:5px;color:white">
                                                           <th colspan="2">
                                                               Booking Details
                                                           </th>
                                                       </tr>
                                                   </tbody>

                                            <tbody>
                                              ${req.body.reservations[0].selectedPickupPoints.map(
                                                (point) =>
                                                  `
                                                  <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                    Pickup Point
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                          ${point.address}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>

                                             ${
                                               point?.flightDetails
                                                 ?.flightNumber
                                                 ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                   Flight Number
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                              ${point?.flightDetails?.flightNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                 : ""
                                             }

                                            ${
                                              point?.flightDetails
                                                ?.waitingPickupTime
                                                ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Requested Pickup Time
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.flightDetails?.waitingPickupTime}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                : ""
                                            }

                                                ${
                                                  point?.postCodeDetails
                                                    ?.postCodeAddress
                                                    ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Postcode Address:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.postCodeDetails?.postCodeAddress}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                    : ""
                                                }


                                                ${
                                                  point?.roomNumber
                                                    ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Address Description:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.roomNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                    : ""
                                                }

                                       ${
                                         point?.cruiseNumber
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Cruise Number:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.cruiseNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.trainNumber
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                     Train Number:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.trainNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.pcatId === 8 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                     Cities:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }

                                       ${
                                         point?.pcatId === 9 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                   Universities And Colleges:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.pcatId === 10 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                         Description:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }



                                                `
                                              )}


                                              ${req.body.reservations[0].selectedDropoffPoints.map(
                                                (point) =>
                                                  `
                                                  <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                   Dropoff Point
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                          ${point.address}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>

                                             ${
                                               point?.flightDetails
                                                 ?.flightNumber
                                                 ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                   Flight Number
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                              ${point?.flightDetails?.flightNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                 : ""
                                             }

                                            ${
                                              point?.flightDetails
                                                ?.waitingPickupTime > 0
                                                ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Requested Pickup Time
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.flightDetails?.waitingPickupTime}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                : ""
                                            }

                                                ${
                                                  point?.postCodeDetails
                                                    ?.postCodeAddress
                                                    ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Postcode Address:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.postCodeDetails?.postCodeAddress}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                    : ""
                                                }


                                                ${
                                                  point?.roomNumber
                                                    ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Address Description:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.roomNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                                    : ""
                                                }

                                       ${
                                         point?.cruiseNumber
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                 Cruise Number:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.cruiseNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.trainNumber
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                     Train Number:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                ${point?.trainNumber}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.pcatId === 8 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                     Cities:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }

                                       ${
                                         point?.pcatId === 9 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                   Universities And Colleges:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }


                                       ${
                                         point?.pcatId === 10 &&
                                         point?.["address-description"]
                                           ? ` <tr>
                                                  <td style="font-weight:bold;width: 200px !important;padding-left: 3px">
                                                         Description:
                                                  </td>

                                                  <td style="padding:2px;">
                                                    <span>
                                                      <span style="float: left;width: 100%;list-style: none;padding: 0 0 0 0;">
                                                        <span style="float: left;width: 100%;margin-bottom: 1%;">
                                                                  ${point?.["address-description"]}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </td>
                                                </tr>
                                                `
                                           : ""
                                       }



                                                `
                                              )}



                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">${
                                                      req.body.reservations[0]
                                                        .selectedPickupPoints[0]
                                                        ?.pcatId === 1
                                                        ? "Flight"
                                                        : ""
                                                    } Landing Date and Time</td>
                                                      <td style="padding:2px"><span>
                                                    ${
                                                      req.body.reservations[0].transferDetails?.transferDateTimeString.split(
                                                        " "
                                                      )[0]
                                                    }

                                                    ${
                                                      req.body.reservations[0].transferDetails?.transferDateTimeString.split(
                                                        " "
                                                      )[1]
                                                    }
                                                    </span></td>
                                                </tr>

                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important; padding:2px 3px;">Vehicle Type</td>
                                                       <td style="padding:2px">${
                                                         req.body
                                                           .vehicleTypes[0]
                                                       }</td>
                                                </tr>
                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">Transfer Type</td>
                                                    <td style="padding:2px">
                                                    ${req.body.transferTypes[0]}
                                                    </td>
                                                </tr>
                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">Special Requests</td>
                                                    <td style="min-height: 29px;padding:2px">${
                                                      req.body.reservations[0]
                                                        .transferDetails
                                                        ?.specialRequests
                                                    }</td>
                                                </tr>
                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">Journey Price</td>
                                                     <td style="padding:2px">
                                                    GBP ${
                                                      req.body?.reservations[0]
                                                        .quotation?.price
                                                    } </td>
                                                </tr>
                                                <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">Payment Method</td>
                                                    <td style="padding:2px">
                                                     ${
                                                       req.body.reservations[0]
                                                         .paymentDetails
                                                         ?.paymentType === 1
                                                         ? "Pay With Cash To Driver"
                                                         : ""
                                                     }
                                           ${
                                             req.body.reservations[0]
                                               .paymentDetails?.paymentType ===
                                             2
                                               ? "Pay With Credit Card"
                                               : ""
                                           }
                                           ${
                                             req.body.reservations[0]
                                               .paymentDetails?.paymentType ===
                                             6
                                               ? "Pay With American Express"
                                               : ""
                                           }
                                           ${
                                             req.body.reservations[0]
                                               .paymentDetails?.paymentType ===
                                             7
                                               ? "Pay With Credit Card"
                                               : ""
                                           }
                                                    </td>
                                                </tr>
                                                      <tr style="width:100%;">
                                                    <td style="font-weight:bold;width: 200px !important;padding:2px 3px;">Surcharge</td>
                                                     <td style="padding:2px">
                                                    GBP ${
                                                      req.body?.surcharge
                                                        ? req.body.surcharge
                                                        : "0.00"
                                                    } </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
<!--transfer pick drop pointsssssssssssssss-->
                                         <!-- adresss description  -->
                                     <div style="float:left;width: 650px;font-family:Arial, Helvetica,Verdana sans-serif !important ;color:#666;">
                                        <span><br>Heathrow Gatwick Transfers <br>Challenge House,
                                          <br>616 Mitcham Road ,
                                           <br>Croydon, Surrey ,
                                           <br>CR0 3AA
                                          <br>Tel: <span class="js-phone-number">+44 208 683 2330</span>,
                                          <br>Website:
                                          <a href="http://www.heathrow-gatwick-transfers.com" target="_blank">www.heathrow-gatwick-transfers.com</a>,
                                          <br>Email enquiries:
                                          <a href="#" target="_blank" rel=" noopener noreferrer">
                                           info@heathrow-gatwick-transfers.com
                                       </a>
                                     </span>
                                  </div>
           </div>
        </div>
    `;
    res.status(200).json({ status: "OK", htmlTemplate });
  }
}
