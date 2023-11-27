import React, { useEffect, useState } from "react";
import BlueBotton from "../../components/elements/Buttons/BlueButton";
import Layout from "../../components/layouts/Layout";
import {
  DroopOffPointsOneWayCopy,
  DropOffPointsReturnCopy,
  paxReturn,
  paxTransfer,
  PickUpPointsOneWayCopy,
  PickUpPointsReturnCopy,
  returnDateTimeString,
  returnPassengerEmail,
  returnPassengerFullName,
  returnPassengerPhone,
  selectArchieveToken,
  selectCHheckedInput,
  selectedReturnQuot,
  selectedTransferQuot,
  selectPickUpDropOffReducer,
  transferDateTimeString,
  transferPassengerEmail,
  transferPassengerFullName,
  transferPassengerPhone,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import Informations from "./Informations/Informations";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import env from "../../resources/env";
import ProgressBar from "../../components/elements/ProgresBar";
import { useConfirm } from "../../hooks/useConfirm";
const ReservDocuments = () => {
  const {
    reservations,
    params: { journeyType },
    meetPoint,
  } = useSelector(selectPickUpDropOffReducer);
  const selectedPickUpPointsTr = useSelector(PickUpPointsOneWayCopy);
  const selectedDropPointsTr = useSelector(DroopOffPointsOneWayCopy);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  const trDateTime = useSelector(transferDateTimeString);

  //*inputs 0
  const fullnameTransfer = useSelector(transferPassengerFullName);
  const emailTransfer = useSelector(transferPassengerEmail);
  const phoneTranfer = useSelector(transferPassengerPhone);
  const selectPaxTransfer = useSelector(paxTransfer);

  //*inputs1
  const fullNameReturn = useSelector(returnPassengerFullName);
  const emailReturn = useSelector(returnPassengerEmail);
  const phoneReturn = useSelector(returnPassengerPhone);
  //error flight ucun sadece ikiterefdede pcikup'i ilgilendirir
  const slectPickUpPointsReturn = useSelector(PickUpPointsReturnCopy);
  const selectDropOffPointsReturn = useSelector(DropOffPointsReturnCopy);
  const selectSelectedReturnQuot = useSelector(selectedReturnQuot);
  const returnDate = useSelector(returnDateTimeString);
  const selectPaxReturn = useSelector(paxReturn);
  const checked = useSelector(selectCHheckedInput);
  const [reservId, setReservId] = useState("");
  const selectedArchieveToken = useSelector(selectArchieveToken);
  const { appData } = useSelector(selectPickUpDropOffReducer);

  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
  const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/", message: "If you leave the page, all data will be deleted." })

  //when passenger gets reserv d we need archieve token
  const fetchArchieveToken = async (params = {}) => {
    let { id, stage } = params
    let reservationObj = parseInt(journeyType)===1 ? reservations : [reservations[0]];
    if (reservationObj.length > 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
            id: id[0][0]
          },
        },
        {
          ...reservationObj[1],
          reservationDetails: {
            ...reservationObj[1].reservationDetails,
            id: id[0][1]
          },
        },
      ]
    } else {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
            id: id[0][0]
          },
        },
      ]
    }

    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: selectedArchieveToken,
        details: reservationObj,
        stage
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log({ data, reservationObj, stage });

  };
  function isJSON(string) {
    try {
      let json = JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  const generatePdf = (e) => {
    if (typeof window === "object") {
      let file = document.getElementById("pdf_file");
      html2canvas(file, {
        logging: true,
        letterRendering: 1,
        useCORS: true,
      }).then(function (canvas) {
        var imgData = canvas.toDataURL("img/png", "red");
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(
          imgData,
          "PNG",
          20,
          selectSelectedReturnQuot?.token ? 0 : 10,
          file.clientWidth / 5,
          selectSelectedReturnQuot?.token
            ? file.clientHeight / 6.5
            : file.clientHeight / 5.2
        );
        doc.save("reserv.pdf");
      });
    }
  };
  const submitDataToGetReservId = () => {
    var body = parseInt(journeyType) === 1 ? reservations : [reservations[0]];
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservation: body, configurations: { sendConfirmationEmailToPassenger: true } }),
    };

    fetch(`${env.apiDomain}/api/v1/reservation/`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response = isJSON(isJSON) ? JSON.parse(response) : response;
        console.log(response);
        if (typeof response === "object" && response.status === 200) {
          setReservId(response.data["reservations-ids"] ? response.data["reservations-ids"] : null);
          fetchArchieveToken({ id: response.data["reservations-ids"], stage: "GET_RESERVATION_ID" });
        } else {
          fetchArchieveToken({ id: [[null], [null]], stage: "GET_SERVER_RESPONED" });
          window.handelErrorLogs(
            "else part fetch response  https://api.london-tech.com/api/v1/reservation",
            'HGT ReservDocuments Component - submitDataToGetReservId function fetch_response_ else part ',
            { requestOptions, response, body }
          )
        }
      })
      .catch((error) => {
        window.handelErrorLogs(error, 'HGT ReservDocuments Component - submitDataToGetReservId function fetch_ cathc blog', { requestOptions, body })
      });
  };

  useEffect(() => {
    submitDataToGetReservId();
    window.scroll({
      top: 95,
      left: 0,
      behavior: "smooth",
    });
  }, []);


  useEffect(() => {
    if (reservId) {
      fetchArchieveToken({ id: reservId, stage: "RENDER_RESERVATION_DETAILS" });
    }
  }, [reservId])

  /*
 let response = {
            status: 201,
            response: {
                status: 200,
                data: {
                    "reservations-ids": [12345, 65432],
                },
            },
        };
*/
  return (
    <Layout
      title="Step 4 | Get İnvoices"
      description="Step 4 | Get İnvoices"
      keywords="Step 4 | Get İnvoices"
    >
      {
        <div className={styles.reserv_documents}>
          {reservId ? (
            <div className={styles.section}>
              <div className={styles.reserv_container}>
                <div className={styles.downland_button} onClick={generatePdf}>
                  <BlueBotton
                    colorViceVerse={true}
                    title="Download the Confirmation"
                    type=""
                  />
                </div>
                <div className={styles.invoice} id="pdf_file">
                  {/* leeft */}
                  <div className={styles.invoice_left}>
                    <div className={styles.invoice_left_header}>
                      <img src="/images/br.png" alt="" />
                      <h1>heathrow-gatwick</h1>
                      <p>transfers</p>
                    </div>
                    <div className={styles.invoice_left_center}>
                      <div
                        className={`${styles.invoice_left_center_register} ${styles.invoice_left_center_inf}`}
                      >
                        <h3>Registered Office</h3>
                        <p>
                          Aero House, 611 Sipson Road, West Drayton, UB7 0JD,
                          United Kingdom
                        </p>
                      </div>
                      <div
                        className={`${styles.invoice_left_center_contact} ${styles.invoice_left_center_inf}`}
                      >
                        <h3>Contact Us</h3>
                        <p>
                          00442038873844 <br />
                          00442038873844 <br />
                          info@london-heathrow taxi
                        </p>
                      </div>
                    </div>
                    <div className={styles.invoice_left_footer}>
                      <h3>Terms & Conditions </h3>
                      <p>
                        All quotations are valid for 30 days and Airport -meet
                        and greet, waiting time*, parking or tolls.
                      </p>

                      <p>Gratuities are at the Customer’s discretion.</p>
                    </div>
                  </div>
                  {/* right */}
                  <div className={styles.invoice_right}>
                    {/* burasi mobile versiyonda gorunecek Left hissenin headiridir */}
                    <div
                      className={`${styles.invoice_leftt_inside_right} ${styles.visibleInMobile}`}
                    >
                      <div className={styles.invoice_leftt_header}>
                        <img src="/images/br.png" alt="" />
                        <h1>heathrow-gatwick</h1>
                        <p>transfers</p>
                      </div>
                    </div>
                    <div className={styles.invoice_right_header}>
                      {/* <img src="/images/chk.jpg" alt="" /> */}
                      <h4>
                        Booking <strong>SUCCESSFULLY</strong> Completed!
                      </h4>
                      <p className={styles.thanks}>
                        Booking details has been sent to given email address.
                      </p>
                      <div style={{ display: "flex" }}>
                        <p>
                          Date :{" "}
                          <span>
                            {trDateTime
                              .split(" ")[0]
                              .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* //!main tablee */}
                    <div className={styles.invoice_right_bill} id="table_file">
                      <div className={styles.pdf_content}>
                        <div className={styles.content_of_reserv}>
                          <div className={styles.passenger_details}>
                            <div className={styles.passenger_details_header}>
                              <h5> Journey Details</h5>

                              <p>Reservation Id: {reservId[0][0]}</p>
                            </div>
                            <Informations
                              date={trDateTime}
                              quot={selectedQuotTransfer}
                              pickUps={selectedPickUpPointsTr}
                              drops={selectedDropPointsTr}
                              fullName={fullnameTransfer}
                              email={emailTransfer}
                              phone={phoneTranfer}
                              passengers={selectPaxTransfer}
                              note={
                                reservations[0]?.transferDetails
                                  ?.specialRequests
                              }
                              paymentType={
                                reservations[0]?.paymentDetails?.paymentType
                              }
                            />
                          </div>
                          {selectSelectedReturnQuot &&
                            slectPickUpPointsReturn?.length > 0 &&
                            selectDropOffPointsReturn?.length > 0 && (
                              <div
                                className={`${styles.passenger_details} ${selectedReturnQuot && styles.hasReturnQuot
                                  }`}
                              >
                                <div
                                  className={styles.passenger_details_header}
                                >
                                  <h5>Return Details</h5>
                                  {journeyType === 1 && (
                                    <p>Reservation Id: {reservId[0][1]}</p>
                                  )}
                                </div>
                                <Informations
                                  date={returnDate}
                                  quot={selectSelectedReturnQuot}
                                  pickUps={slectPickUpPointsReturn}
                                  drops={selectDropOffPointsReturn}
                                  fullName={
                                    checked ? fullnameTransfer : fullNameReturn
                                  }
                                  email={checked ? emailTransfer : emailReturn}
                                  phone={checked ? phoneTranfer : phoneReturn}
                                  passengers={
                                    checked
                                      ? selectPaxTransfer
                                      : selectPaxReturn
                                  }
                                  note={
                                    reservations[0]?.transferDetails
                                      ?.specialRequests
                                  }
                                  paymentType={
                                    reservations[1]?.paymentDetails?.paymentType
                                  }
                                />
                              </div>
                            )}
                          <div className={styles.bottom_tot}>
                            <div className={styles.thankyou}>
                              <i className="fa-solid fa-face-smile"></i>
                              <p>Thank you for booking with us.</p>
                            </div>
                            <div className={styles.bottom_tot_price}>
                              <p className={styles.bottom_tot_price_text}>
                                Total Price:
                              </p>
                              <span className={styles.bottom_tot_price_price}>
                                £
                                {selectedQuotTransfer?.price &&
                                  selectSelectedReturnQuot?.price
                                  ? Number(selectedQuotTransfer?.price) +
                                  Number(selectSelectedReturnQuot?.price)
                                  : Number(selectedQuotTransfer?.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${styles.section} ${styles.section_two}`}>
              <ProgressBar />
            </div>
          )}
        </div>
      }
    </Layout>
  );
};

export default ReservDocuments;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/reservations-document") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "",
    },
  };
}
