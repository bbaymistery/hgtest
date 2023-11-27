import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/useWindowSize";
import env from "../../../resources/env";
import {
  addExtraInputForJourney,
  addItemToSelectedList,
  gettingQuotations,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import NoResult from "./NoResult";
import styles from "./styles.module.scss";
const HandleSearchResults = ({ pickOrDrop, setInternalState }) => {
  const {
    params,
    params: { journeyType },
    direction,
    appData,
  } = useSelector(selectPickUpDropOffReducer);

  const imgObj = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );
  const namePlaceOfObj = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.categoryName,
    }),
    {}
  );

  const objectDetailss = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.objectDetails),
    }),
    {}
  );

  const [newItems, setNewItems] = useState(null);
  const [noResult, setNoresult] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  let size = useWindowSize()
  let { width } = size
  const handleAddItemToSelectList = (item) => {
    //sending request to google placeis
    dispatch(
      addItemToSelectedList(
        item,
        pickOrDrop,
        journeyType,
        objectDetailss[item.pcatId]
      )
    );
    //  setDatas((perviousValues) => [
    //    {
    //      ...perviousValues[0],
    //      selectedDropoffPoints: [...selectOrijinalPickUpPoints],
    //      selectedDropoffPoints: [...selectOrijinalDropOffPoints],
    //    },
    //  ]);

    dispatch(
      addExtraInputForJourney(pickOrDrop, journeyType, "insideHandleSearch")
    );
    console.log("S");


    if (router.pathname === "/quotation" && direction === "left") {
      dispatch(
        gettingQuotations(router, 0, {
          updateInsideQuotation: true,
        })
      );
    }
    //bunu deyiseceyik sadece return ucun edeceyik
    if (router.pathname === "/quotation" && direction === "right") {
      dispatch(
        gettingQuotations(router, 1, {
          updateInsideQuotation: true,
        })
      );
    }
    if (router.pathname === "/managebooking") {
      dispatch(
        gettingQuotations(router, 0, {
          updateInsideQuotation: true,
        })
      );
    }

    if (width < 990) {
      setInternalState({
        [`pickup-search-focus-0`]: false,
        [`dropoff-search-focus-0`]: false,
        [`pickup-search-focus-1`]: false,
        [`dropoff-search-focus-1`]: false,
      })
    }
  };

  useEffect(() => {
    if (params.searchEngine[journeyType][pickOrDrop]) {
      let keyss = Object.keys(params.searchEngine[journeyType][pickOrDrop]);
      //console.log(params.searchEngine[journeyType][pickOrDrop]); //{0: Array(30), 1: Array(4)}
      const moveZeroosToTheEnd = (nums) => {
        let zeros = 0;
        for (let i = 0; i < nums.length; i++) {
          let isZero = nums[i] === "0";
          if (isZero) {
            zeros++;
            nums.splice(i, 1);
            i--;
          }
        }
        for (let i = 0; i < zeros; i++) {
          nums.push("0");
        }
        return nums;
      };
      moveZeroosToTheEnd(keyss);
      keyss = moveZeroosToTheEnd(keyss);

      let newA = keyss.map((key) => {
        return params.searchEngine[journeyType][pickOrDrop][key];
      });
      if (newA[0] === true) setNoresult(true);
      //console.log(newA); // [Array(4), Array(30)]

      setNewItems(newA);
    } else {
      setNoresult(true)
    }
  }, [params]);

  return (
    <div className={styles.search_results}>
      {noResult && <NoResult />}

      {newItems?.length && !noResult ? (
        <ul>
          {newItems?.length &&
            newItems?.map((arr) => {
              return arr?.map((item, i) => {
                return (
                  <div key={i}>
                    {/* //!this is for group name  */}
                    {i === 0 && (
                      <li key={i} className={i === 0 ? styles.groupName : ""}>
                        {item.pcatId === 10 ? (
                          <img
                            src={`${env.apiDomain}/media/g-google.svg`}
                            alt=""
                          />
                        ) : (
                          imgObj && (
                            <img
                              src={`${env.apiDomain}${imgObj[item.pcatId]
                                }`}
                              alt=""
                            />
                          )
                        )}

                        <a href="/location/londiani-188981">
                          {namePlaceOfObj && namePlaceOfObj[item.pcatId]}
                        </a>
                        {item.pcatId === 10 && (
                          <img
                            src={
                              `${env.apiDomain}/media/powered-by-google.png`
                            }
                            alt=""
                            className={styles.googleImage}
                          />
                        )}
                      </li>
                    )}

                    {/* //!this is for the rest of subNames */}
                    <li onClick={() => handleAddItemToSelectList(item)}>
                      {imgObj && (
                        <img
                          src={`${env.apiDomain}${imgObj[item.pcatId]
                            }`}
                          alt=""
                        />
                      )}
                      <p href="/location/londiani-188981">
                        {item.address}
                        {`   ${item?.postcode ? `-  ${item?.postcode}` : ""}`}
                      </p>
                    </li>
                  </div>
                );
              });
            })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default HandleSearchResults;
