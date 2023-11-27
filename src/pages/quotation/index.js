import React, { useEffect } from "react";
import OneWay from "../../components/elements/Hero/OneWay/OneWay";
import Return from "../../components/elements/Hero/Return/Return";
import Layout from "../../components/layouts/Layout";
import {
  DroopOffPointsOneWay,
  DropOffPointsReturn,
  ModalInfo,
  PickUpPointsOneWay,
  PickUpPointsReturn,
  quotReturnLoading,
  quotTransferLoading,
  returnErrorParams,
  returnQuotOptions,
  selectedReturnQuot,
  selectedTransferQuot,
  transferErrorParams,
  transferQuotOptions,
  selectedJourneyType
} from "../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import Map from "./Map.js";
import HeaderOfResults from "./HeaderOfResults";
import { useRouter } from "next/router";
import CardQuotation from "../../components/elements/CardQuotation";
import InfoModal from "../../components/elements/InfoModal/InfoModal";
import { useConfirm } from '../../hooks/useConfirm'

const Quotation = () => {
  const selectedTrQuots = useSelector(transferQuotOptions);
  const selectedReturnQuots = useSelector(returnQuotOptions);
  const selectedSingleeTransferQuot = useSelector(selectedTransferQuot);
  const selectedSingleeReturnQuot = useSelector(selectedReturnQuot);
  const selectQuotTransferLoading = useSelector(quotTransferLoading);
  const selectQuotReturnLoading = useSelector(quotReturnLoading);
  const selectTransferErorParams = useSelector(transferErrorParams);
  const selectReturnErrorParams = useSelector(returnErrorParams);
  const selectModalInfo = useSelector(ModalInfo);
  const selectedPickUpsOneWay = useSelector(PickUpPointsOneWay);
  const selectedDropOffOneWay = useSelector(DroopOffPointsOneWay);
  const selectJourneyType = useSelector(selectedJourneyType)
  const selectReturnPickUp = useSelector(PickUpPointsReturn);
  const selectReturnDropOf = useSelector(DropOffPointsReturn);
  const { showOnlyTransferCOmp } = useSelector(
    (state) => state.pickUpDropOffReducer
  );
  const router = useRouter();
  //in order having confirmation message

  const gotoTransferDetailsClick = () => {

    if (selectJourneyType === 0) {
      if (!selectedSingleeTransferQuot.token) {
        alert("Please select which quotation do you want  for your journey?");
        return
      }
    }

    if (selectJourneyType === 1) {
      if (!selectedSingleeReturnQuot.token && !selectedSingleeTransferQuot.token) {
        alert("Please select which quotation do you want  for your journey?");
        return
      }

      if (!selectedSingleeReturnQuot.token) {
        alert("Please select which quotation do you want  for your return  journey?");
        return
      }
      if (!selectedSingleeTransferQuot.token) {
        alert("Please select which quotation do you want  for your journey?");
        return
      }
    }

    router.push("/transfer-details");

  };
  useEffect(() => {
    const container = document?.querySelector(".scContent");
    if (820 > document?.documentElement?.clientWidth) {
      window.scroll({
        top: container?.getBoundingClientRect()?.top - 82,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  //biz returne ikidene ayri prop gondereceyik biri sol terefi saglamlasdirmag ucun digeri ise asagida return qismini ayarlamag ucun
  return (
    <>
      <Layout
        title="Step 1 | Get a Quote"
        description="Step 1 | Get a Quote"
        keywords="Step 1 | Get a Quote"
      >
        <div className={styles.quotation_section}>
          {selectModalInfo && (
            <InfoModal content="This is meant to give an approximation of car size and category .Actual mane and model may vary" />
          )}
          {/* search details  */}
          <div className={` ${styles.section}`}>
            {/* //!bu sadece tansfer icin */}
            {showOnlyTransferCOmp && (
              <div className={styles.quotation_container}>
                <div className={styles.quotation_panel}>
                  <h2 className="">Journey Details</h2>
                  {
                    <OneWay
                      btnTittle={"Update "}
                      border={"blue"}
                      responsive={true}
                      fromQuotation={true}
                    />
                  }
                  {
                    selectedPickUpsOneWay?.length > 0 &&
                    selectedDropOffOneWay?.length > 0 &&
                    selectedTrQuots?.status === 200 &&
                    <Map
                      datas={selectedTrQuots}
                      selectedPickPoints={selectedPickUpsOneWay}
                      selectedDroppOfPoints={selectedDropOffOneWay}
                    />
                  }

                </div>
                <div className={styles.result_container}>
                  <HeaderOfResults selectedTrQuots={selectedTrQuots} />
                  <div className={`${styles.quotation_items} scContent`}>
                    <CardQuotation
                      datas={selectedTrQuots}
                      journeyType={0}
                      selectedQuotation={selectedSingleeTransferQuot}
                      quotLoading={selectQuotTransferLoading}
                      errorMessageForShowNull={
                        selectTransferErorParams.dateTimeForBoolean
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* burda yazilan srf returnnen gelerse eger client onda bize transferin header li formasi lazm olacagi ucun onu bu sekilde yazdiririq  */}
            {/*//! burda yazilan ise ikisi ucun */}
            {!showOnlyTransferCOmp && (
              <div className={styles.quotation_container}>
                <div className={styles.quotation_panel}>
                  <h2>Go Journey</h2>
                  <OneWay btnTittle={"Update "} border={"blue"} responsive={true} showHeader={true} fromQuotation={true} />
                  {selectedPickUpsOneWay?.length > 0 &&
                    selectedDropOffOneWay?.length > 0 &&
                    selectedTrQuots.status === 200 ?
                    <Map
                      datas={selectedTrQuots}
                      selectedPickPoints={selectedPickUpsOneWay}
                      selectedDroppOfPoints={selectedDropOffOneWay}
                    /> : <></>}
                </div>
                <div className={styles.result_container}>
                  <HeaderOfResults selectedTrQuots={selectedTrQuots} />

                  <div className={styles.quotation_results}>
                    <div className={styles.quotation_items}>
                      <CardQuotation
                        datas={selectedTrQuots}
                        journeyType={0}
                        selectedQuotation={selectedSingleeTransferQuot}
                        quotLoading={selectQuotTransferLoading}
                        errorMessageForShowNull={
                          selectTransferErorParams.dateTimeForBoolean
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!showOnlyTransferCOmp && (
              <div className={styles.quotation_container}>
                <div className={styles.quotation_panel}>
                  <h2>Return Journey Details</h2>
                  <Return btnTittle={"Update "} border={"blue"} responsive={true} remainReturnSide={true} fromQuotation={true} />
                  {selectReturnPickUp?.length > 0 && selectReturnDropOf?.length > 0 && selectedReturnQuots.status === 200 ?
                    <Map datas={selectedReturnQuots} selectedPickPoints={selectedPickUpsOneWay} selectedDroppOfPoints={selectedDropOffOneWay} /> : <></>
                  }

                </div>
                <div className={styles.result_container}>
                  <HeaderOfResults title={"Return Journey"} selectedTrQuots={selectedReturnQuots} />
                  <div className={styles.quotation_results}>
                    <div className={styles.quotation_items}>
                      <CardQuotation
                        datas={selectedReturnQuots}
                        journeyType={1}
                        selectedQuotation={selectedSingleeReturnQuot}
                        quotLoading={selectQuotReturnLoading}
                        errorMessageForShowNull={
                          selectReturnErrorParams.dateTimeForBoolean
                        }
                      />
                    </div>

                    {/* //buttons with shadows    */}
                  </div>
                  {!selectReturnErrorParams.dateTimeForBoolean ? (
                    <div className={` ${styles.items_buttons}`}>
                      <div className={`${styles.item} ${styles.btn_item}`}>
                        <div
                          className={styles.item_body}
                          onClick={() => router.back()}
                        >
                          <button>Go Back</button>
                        </div>
                      </div>
                      <div className={`${styles.item} ${styles.btn_item}`}>
                        <div
                          className={styles.item_body}
                          onClick={gotoTransferDetailsClick}
                        >
                          <button>Book Now</button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Quotation;
export async function getServerSideProps({ req, res }) {
  if (req.url === "/quotation") {
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

