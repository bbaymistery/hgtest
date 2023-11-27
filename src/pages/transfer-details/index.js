import React from "react";
import Layout from "../../components/layouts/Layout";
import styles from "./styles.module.scss";
import BlueBotton from "../../components/elements/Buttons/BlueButton";
import {
  returnDateTimeString,
  returnPassengerEmail,
  returnPassengerFullName,
  returnPassengerPhone,
  selectedReturnQuot,
  selectedTransferQuot,
  transferDateTimeString,
  transferPassengerEmail,
  transferPassengerFullName,
  transferPassengerPhone,
  selectCHheckedInput,
  passngTrsErrors,
  returnPassErrors,
  PickUpPointsOneWayCopy,
  DroopOffPointsOneWayCopy,
  PickUpPointsReturnCopy,
  DropOffPointsReturnCopy,
  ModalInfo,
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCheckedInput,
  setErorReturnDetailsPage,
  setErrorForPassengerDetails,
  setErrorInTransferDetailsPage,
} from "../../store/pickUpDropOffReducer/pickUpDropAction";
import { useRouter } from "next/router";
import TransferDetailsPageHeader from "../../components/elements/TransferDetailsPageHeader";
import TransferDetailsPagePassengerDetails from "../../components/elements/TransferDetailsPagePassengerDetails";
import TransferDetailsPageJourneyDetails from "../../components/elements/TransferDetailsPageJourneyDetails";
import { SET_ERROR_FOR_TRANSFER_DETAILS_PAGE } from "../../store/pickUpDropOffReducer/pickUpDropTypes";
import InfoModal from "../../components/elements/InfoModal/InfoModal";
import { useConfirm } from "../../hooks/useConfirm";

const TransferDetails = () => {
  const dispacth = useDispatch();
  const router = useRouter();
  const selectedPickUpPointsTr = useSelector(PickUpPointsOneWayCopy);
  const selectedDropPointsTr = useSelector(DroopOffPointsOneWayCopy);
  const selectedQuotTransfer = useSelector(selectedTransferQuot);
  const trDateTime = useSelector(transferDateTimeString);
  //*inputs 0
  const fullnameTransfer = useSelector(transferPassengerFullName);
  const emailTransfer = useSelector(transferPassengerEmail);
  const phoneTranfer = useSelector(transferPassengerPhone);

  //*errors
  const passengerTrErrors = useSelector(passngTrsErrors);
  const passengerReturnErrors = useSelector(returnPassErrors);

  //*inputs1
  const fullNameReturn = useSelector(returnPassengerFullName);
  const emailReturn = useSelector(returnPassengerEmail);
  const phoneReturn = useSelector(returnPassengerPhone);
  //error flight ucun sadece ikiterefdede pcikup'i ilgilendirir

  const slectPickUpPointsReturn = useSelector(PickUpPointsReturnCopy);
  const selectDropOffPointsReturn = useSelector(DropOffPointsReturnCopy);
  const selectSelectedReturnQuot = useSelector(selectedReturnQuot);
  const returnDate = useSelector(returnDateTimeString);
  const checkedInput = useSelector(selectCHheckedInput);

  const selectModalInfo = useSelector(ModalInfo);
  const confirmationAlert = useConfirm({ previousUrl: "/quotation", nextUrl: "/payment", message: "If you leave the page, all data will be deleted." })

  const handleChange = (e) => {

    dispacth(changeCheckedInput(e.currentTarget.checked));
  };

  const handleClickToTheNextPaymentPage = (e) => {
    //bu error sadece flight ile ilgili inut boslugunda olusucak
    //*checking flights length start
    selectedPickUpPointsTr.map((each, i) => {
      if (each?.flightDetails?.flightNumber?.length < 1) {
        dispacth(
          setErrorInTransferDetailsPage(
            "required",
            "transfer",
            "flightCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErrorInTransferDetailsPage(
            "",
            "transfer",
            "flightCategory",
            router,
            i
          )
        );
      }
    });

    selectedPickUpPointsTr.map((each, i) => {
      if (each?.waitingTime?.length < 1) {
        dispacth(
          setErrorInTransferDetailsPage(
            "required",
            "transfer",
            "flightCategory_Waiting",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErrorInTransferDetailsPage(
            "",
            "transfer",
            "flightCategory_Waiting",
            router,
            i
          )
        );
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    slectPickUpPointsReturn.map((each, i) => {
      if (each?.flightDetails?.flightNumber?.length < 1) {
        dispacth(
          setErorReturnDetailsPage(
            "required",
            "return",
            "flightCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErorReturnDetailsPage("", "return", "flightCategory", router, i)
        );
      }
    });
    slectPickUpPointsReturn.map((each, i) => {
      if (each?.waitingTime?.length < 1) {
        dispacth(
          setErorReturnDetailsPage(
            "required",
            "return",
            "flightCategory_Waiting",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErorReturnDetailsPage("", "return", "flightCategory_Waiting", router, i)
        );
      }
    });
    //*checking flights length finish
    //*cruise start
    selectedPickUpPointsTr.map((each, i) => {
      if (each?.cruiseNumber?.length < 1) {
        dispacth(
          setErrorInTransferDetailsPage(
            "required",
            "transfer",
            "cruise",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErrorInTransferDetailsPage("", "transfer", "cruise", router, i)
        );
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    slectPickUpPointsReturn.map((each, i) => {
      if (each?.cruiseNumber?.length < 1) {
        dispacth(
          setErorReturnDetailsPage("required", "return", "cruise", router, i)
        );
      } else {
        dispacth(setErorReturnDetailsPage("", "return", "cruise", router, i));
      }
    });
    //*cruise finish

    //*postss start
    selectedPickUpPointsTr.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispacth(
          setErrorInTransferDetailsPage(
            "required",
            "transfer",
            "postCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErrorInTransferDetailsPage(
            "",
            "transfer",
            "postCategory",
            router,
            i
          )
        );
      }
    });
    selectedDropPointsTr.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispacth(
          setErrorInTransferDetailsPage(
            "required",
            "transfertwo",
            "postCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErrorInTransferDetailsPage(
            "",
            "transfertwo",
            "postCategory",
            router,
            i
          )
        );
      }
    });
    //burda eger returndeki pick upoints varsa icindekilerin biri bos ise error verir
    slectPickUpPointsReturn.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispacth(
          setErorReturnDetailsPage(
            "required",
            "return",
            "postCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErorReturnDetailsPage("", "return", "postCategory", router, i)
        );
      }
    });
    selectDropOffPointsReturn.map((each, i) => {
      if (each?.postCodeDetails?.postCodeAddress?.length < 1) {
        dispacth(
          setErorReturnDetailsPage(
            "required",
            "returntwo",
            "postCategory",
            router,
            i
          )
        );
      } else {
        dispacth(
          setErorReturnDetailsPage("", "returntwo", "postCategory", router, i)
        );
      }
    });
    //*passenger details error start

    //'gfhgfh@hkjhkj.com'.split('@').length===2 && 'gfhgfh@hkjhkj.com'.split('@')[1].split('.').length === 2
    if (
      fullnameTransfer.length < 1 ||
      emailTransfer.length < 1 ||
      !emailTransfer.includes("@") ||
      emailTransfer.includes(' ') ||
      phoneTranfer.length < 1
    ) {
      dispacth(setErrorForPassengerDetails("required", 0));
    } else {
      dispacth(setErrorForPassengerDetails("", 0));
    }

    if (
      fullNameReturn.length < 1 ||
      !emailReturn.includes("@") ||
      emailReturn.includes(' ') ||
      phoneReturn.length < 1
    ) {
      dispacth(setErrorForPassengerDetails("required", 1));
    } else {
      dispacth(setErrorForPassengerDetails("", 1));
    }

    dispacth({ type: SET_ERROR_FOR_TRANSFER_DETAILS_PAGE });
    gotoNextPage();
  };

  const gotoNextPage = (par) => {
    let arrayForChecking = [
      ...selectedPickUpPointsTr,
      ...selectedDropPointsTr,
      ...slectPickUpPointsReturn,
      ...selectDropOffPointsReturn,
    ];


    let checkForInsideInputs = arrayForChecking?.every((each) => {
      return each?.errorMessage.length < 1;
    });
    let checkInsiDEinputsForWaiiting = arrayForChecking?.every((each) => {
      // console.log(each.waitingTime.length);

      return each?.waitingTime?.length > 0;
    });

    let s = arrayForChecking.map((each) => {

      return each?.waitingTime?.length > 0;
    });
    // console.log(checkInsiDEinputsForWaiiting,"checkInsiDEinputsForWaiiting",);
    // console.log(checkForInsideInputs,"checkForInsideInputs");
    // console.log(s,"s");


    if (
      checkInsiDEinputsForWaiiting &&
      checkForInsideInputs &&
      fullnameTransfer.length &&
      emailTransfer.includes("@") &&
      !emailTransfer.includes(' ') &&
      phoneTranfer?.length
    ) {
      router?.push("/payment");
      // console.log("s");
    }
  };
//o soruna gore bunu ekledik https://api.london-tech.com/error/1675089803552
  // useEffect(() => {
  //   if (selectedPickUpPointsTr.length === 0 || selectedDropPointsTr.length === 0) {
  //     router.push("/")
  //   }
  // }, [])
  //bura reduxdan gelen checked olacag

  return (
    <Layout
      title="Step 2 | İnclude Detaıls"
      keywords="Step 2 | İnclude Detaıls"
      description="Step 2 | İnclude Detaıls"
    >
      <div className={styles.transfer_details_section}>
        {selectModalInfo && (
          <InfoModal content="Please note that on international flights, for UK and EU Citizens the average clearing time is around 45 to 60 minutes except for first & business class travellers where it is 30-45 minutes. Other nationalities take around 60-70 minutes and foreign students may take up to 90 minutes. For domestic flight, the clearance time is around 15 minutes" />
        )}
        <div className={styles.section}>
          <div className={styles.transfer_details_container}>
            <TransferDetailsPageHeader
              date={trDateTime}
              quot={selectedQuotTransfer}
              pickUps={selectedPickUpPointsTr}
              drops={selectedDropPointsTr}
            />

            <TransferDetailsPagePassengerDetails
              title="Passenger Details"
              journeyType={0}
              fullname={fullnameTransfer}
              email={emailTransfer}
              phone={phoneTranfer}
              passErrors={passengerTrErrors}
              quot={selectedQuotTransfer}
            />
            <TransferDetailsPageJourneyDetails
              quot={selectedQuotTransfer}
              pickUps={selectedPickUpPointsTr}
              drops={selectedDropPointsTr}
              onlyTransferJourney={true}
              title="Journey Details"
              journeyType={0}
            />
            {/* //!eger return varsa return terefi render eder */}
            {selectSelectedReturnQuot &&
              slectPickUpPointsReturn.length > 0 &&
              selectDropOffPointsReturn.length > 0 && (
                <TransferDetailsPageHeader
                  date={returnDate}
                  quot={selectSelectedReturnQuot}
                  pickUps={slectPickUpPointsReturn}
                  drops={selectDropOffPointsReturn}
                  returnJourneyTrue={true}
                />
              )}
            {checkedInput
              ? null
              : selectSelectedReturnQuot &&
              slectPickUpPointsReturn.length > 0 &&
              selectDropOffPointsReturn.length > 0 && (
                <TransferDetailsPagePassengerDetails
                  title="Passenger Details For Return  Journey"
                  journeyType={1}
                  fullname={fullNameReturn}
                  email={emailReturn}
                  phone={phoneReturn}
                  quot={selectSelectedReturnQuot}
                  passErrors={passengerReturnErrors}
                />
              )}
            {selectSelectedReturnQuot &&
              slectPickUpPointsReturn.length > 0 &&
              selectDropOffPointsReturn.length > 0 && (
                <TransferDetailsPageJourneyDetails
                  title="Return  Journey Details"
                  quot={selectSelectedReturnQuot}
                  pickUps={slectPickUpPointsReturn}
                  drops={selectDropOffPointsReturn}
                  returnJourneyTrue={true}
                  journeyType={1}
                />
              )}

            {slectPickUpPointsReturn.length > 0 &&
              selectDropOffPointsReturn.length > 0 ? (
              <div className={styles.checkBtn}>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  className={styles.checkBtn__input}
                  id="check3"
                  name="check3"
                  defaultChecked={checkedInput}
                />
                <label
                  htmlFor="check3"
                  className={`${styles.checkBtn_label} ${styles.checkBtn_label_bluee
                    }
                  ${checkedInput ? styles.pChecked : styles.checkedText}
                  `}
                >
                  the passenger details{" "}
                  {checkedInput ? (
                    "are a same"
                  ) : (
                    <span className={styles.textMiddle}>are not same </span>
                  )}{" "}
                  for both journey
                </label>
              </div>
            ) : null}
            <div className={styles.buttons}>
              <div className={styles.btn} onClick={() => router.back()}>
                <BlueBotton title="Go Back" type="" responsive={true} />
              </div>
              {/* <Link passHref href="/quotation"> */}
              <div
                className={styles.btn}
                onClick={() => handleClickToTheNextPaymentPage()}
              >
                <BlueBotton title="Next" type="" responsive={true} />
              </div>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default TransferDetails;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/transfer-details") {
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
