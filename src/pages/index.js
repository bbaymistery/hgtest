import React, { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import Layout from "../components/layouts/Layout";
//
import Hero from "../components/elements/Hero";
import Features from "../components/widgets/Features";
// import CarsSlider from "../components/widgets/CarsSlider";
import CarsSlider from "../components/widgets/CarsSlider/FunctionComp";
import SpecialPrices from "../components/widgets/SpecialPrices";
import TestimonialLabel from "../components/widgets/TestimonialLabel";
import TestimanialInfo from "../components/widgets/TestimonialInfo";
import SeaportTransfers from "../components/widgets/SeaportTransfers";
import { useDispatch } from "react-redux";
import { getAppData } from "../store/pickUpDropOffReducer/pickUpDropAction";
import HotelsAirports from "../components/widgets/HotelAirports";

export default function HomePage() {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getAppData());


  }, []);
  return (
    <Layout  >
      <div className={styles.homecontainer}>

        <Hero isHeroContentActive={true} isBgImageActive={true} />
        <Features />
        <CarsSlider />
        <SpecialPrices />
        <HotelsAirports />
        <SeaportTransfers />
        <TestimonialLabel />
        <TestimanialInfo />
      </div>
    </Layout>
  );
}


// export async function getServerSideProps(context) {
//   let tags = ` <link rel="icon" href="/favicon.ico" />
// `

//   return {
//     props: { tags }
//   };
// }


