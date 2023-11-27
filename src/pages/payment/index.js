import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layouts/Layout";
import styles from "./styles.module.scss";
import {
  returnDateTimeString,
  selectedReturnQuot,
  selectedTransferQuot,
  transferDateTimeString,
  PickUpPointsOneWayCopy,
  DroopOffPointsOneWayCopy,
  PickUpPointsReturnCopy,
  DropOffPointsReturnCopy,
  selectCHheckedInput,
  returnPassengerPhone,
  returnPassengerEmail,
  returnPassengerFullName,
  transferPassengerPhone,
  transferPassengerEmail,
  transferPassengerFullName,
  paxReturn,
  paxTransfer,
  commentReturn,
  commentTransfer,
  selectArchieveToken,
  selectedJourneyType,
  selectPickUpDropOffReducer,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import ReservDetail from "./ReservDetail/ReservDetail";
import PaymentDetails from "../../components/elements/PaymentDetails";
import Router, { useRouter } from "next/router";
import { GET_MEET_POINT } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import env from "../../resources/env";
const Payment = () => {
  const { reservations } = useSelector(selectPickUpDropOffReducer);
  const selectedPickUpPointsTr = useSelector(PickUpPointsOneWayCopy);
  const selectedDropPointsTr = useSelector(DroopOffPointsOneWayCopy);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  const trDateTime = useSelector(transferDateTimeString);
  const [confirmation, setConfirmation] = useState(true);
  //*inputs 0
  const fullnameTransfer = useSelector(transferPassengerFullName);
  const emailTransfer = useSelector(transferPassengerEmail);
  const phoneTranfer = useSelector(transferPassengerPhone);
  const selectPaxTransfer = useSelector(paxTransfer);
  const specialRequestTransfer = useSelector(commentTransfer);
  const dispatch = useDispatch();
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
  const specialRequestReturn = useSelector(commentReturn);
  const checked = useSelector(selectCHheckedInput);
  const selectedArchieveToken = useSelector(selectArchieveToken);
  const journeyTypee = useSelector(selectedJourneyType);

  //1 passenger landing payment page We need archieveToken
  const fetchArchieveToken = async (params={}) => {
    let { stage, } = params

    let reservationObj = Number(journeyTypee) === 1 ? reservations : [reservations[0]];
    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: selectedArchieveToken,
        details: reservationObj,
        stage
      }),
      headers: { "Content-Type": "application/json", },
    });
    const data = await response.json();
    console.log({data,stage});
    
  };
  const getmettingPoint = (par) => {
    const url = `${env.apiDomain}/api/v1/drivers/meet-point`;
    let reqOptions = {
      method: "POST",
      body: JSON.stringify({
        point: reservations[0].selectedPickupPoints[0],
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };
    fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data["meet-point"]);
        // console.log(data);

        dispatch({ type: GET_MEET_POINT, payload: data.data["meet-point"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    //passenger landing payment page We need archieveToken
    fetchArchieveToken({ stage: "LANDED_INTO_PAYMENT_PAGE" })
    getmettingPoint();
    window.scroll({
      top: 48,
      left: 0,
      behavior: "smooth",
    });

  
  }, []);
  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    let previousUrl = "/transfer-details"
    let nextUrl = "/reservations-document"
    const confirmationMessage = "If you leave the page, all data will be deleted.";
    const beforeUnloadHandler = async (e) => {
      //when we click to close browser
      setTimeout(() => { fetchArchieveToken({ stage: "PLAN_TO_CLOSE_PAYMENT_PAGE" }) }, 10)
      // /in case if it is cancelled
      if (window.event.cancelable) {
        setTimeout(() => { fetchArchieveToken({ stage: "PAYMENT_PAGE_NOT_CLOSED" }) }, 450)
      }
      if (confirmation) {
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }

    };

    // burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
    const beforeRouteHandler = (url) => {
      if (confirmation) {
        if (url === nextUrl || url === previousUrl) {
          setConfirmation(false)
          return
        } else {
          setConfirmation(true)
        }
        if (Router.pathname !== url && !confirm(confirmationMessage)) {
          Router.events.emit("routeChangeError");
          throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
        }
      }
    };

    const handleEndConcert = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const method = "POST"
      const reservationObj = reservations
      const url = `${env.apiDomain}/api/v1/sessions/add`;
      const body = JSON.stringify({ token: selectedArchieveToken, details: reservationObj, stage: "PAYMENT_PAGE_IS_CLOSED" })
      const response = await fetch(url, { method, body, headers, keepalive: true });
      const data = await response.json();
      console.log({ data, });
    }
    window.addEventListener("beforeunload", beforeUnloadHandler);
    window.addEventListener('unload', handleEndConcert)
    Router.events.on("routeChangeStart", beforeRouteHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      window.removeEventListener('unload', handleEndConcert);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [confirmation]);
  return (
    <Layout
      title="Step 3  | Payment"
      keywords="Step 3  | Payment"
      description="Step 3  | Payment"
    >
      <div className={styles.payment_section}>
        <div className={styles.section}>
          <div className={styles.payment_container}>
            <div className={styles.passenger_details}>
              <div className={styles.payment_details_header}>
                <h5> Journey Details</h5>
              </div>
              <ReservDetail
                date={trDateTime}
                quot={selectedQuotTransfer}
                pickUps={selectedPickUpPointsTr}
                drops={selectedDropPointsTr}
                fullName={fullnameTransfer}
                email={emailTransfer}
                phone={phoneTranfer}
                passengers={selectPaxTransfer}
                specialRequest={specialRequestTransfer}
              />
            </div>
            {selectSelectedReturnQuot &&
              slectPickUpPointsReturn.length > 0 &&
              selectDropOffPointsReturn.length > 0 && (
                <div className={styles.passenger_details}>
                  <div className={styles.payment_details_header}>
                    <h5>Return Details</h5>
                  </div>
                  <ReservDetail
                    date={returnDate}
                    quot={selectSelectedReturnQuot}
                    pickUps={slectPickUpPointsReturn}
                    drops={selectDropOffPointsReturn}
                    fullName={checked ? fullnameTransfer : fullNameReturn}
                    email={checked ? emailTransfer : emailReturn}
                    phone={checked ? phoneTranfer : phoneReturn}
                    passengers={checked ? selectPaxTransfer : selectPaxReturn}
                    specialRequest={specialRequestReturn}
                  />
                </div>
              )}

            <PaymentDetails setConfirmation={setConfirmation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/payment") {
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
// const getmettingPoint = (par) => {
//   const url = "https://api.london-tech.com/api/v1/drivers/meet-point";
//   let reqOptions = {
//     method: "POST",
//     body: JSON.stringify({
//       point: reservations[0].selectedPickupPoints[0],
//     }),
//   headers: {
//     Accept: "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//   },
// };
// fetch(url, reqOptions)
//   .then((res) => res.json())
//   .then((data) => {
// console.log(data.data["meet-point"]);
// console.log(data);

//       dispatch({ type: GET_MEET_POINT, payload: data.data["meet-point"] });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
