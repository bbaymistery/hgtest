import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../components/layouts/Layout/index";
const Sitemap = () => {
  return (
    <Layout title="Sitemap" keywords="Sitemap" description="Sitemap">
      <div className={styles.container_center}>
        <table
          width="100%"
          border="0"
          cellSpacing="0"
          cellPadding="2"
          summary="sitemap"
        >
          <tbody>
            <tr>
              <td colSpan="2" valign="top" align="left">
                <h1
                  style={{ fontSize: "32px" }}
                  className={` ${styles.blue} ${styles.mb1} ${styles.center}`}
                >
                  SITEMAP-HEATHROW GATWICK TRANSFERS
                </h1>
              </td>
            </tr>
            <tr>
              <td style={{ display: "flex" }}>
                <ul>
                  <li style={{ listStyle: "circle", borderBottom: "none" }}>
                    <a className={styles.underline} href="/privacy">
                      Privacy
                    </a>
                  </li>
                  <li style={{ listStyle: "circle", borderBottom: "none" }}>
                    <a className={styles.underline} href="/contactus">
                      Contact Us
                    </a>
                  </li>
                </ul>
                <p>&nbsp;</p>
              </td>
              <td>
                <ul>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1}`}
                  >
                    Main Pages{" "}
                  </h2>
                  <li>
                    <a className={`${styles.center} ${styles.blue} `} href="/">
                      <strong>HOME : </strong>How to get Heathrow to/from
                      Gatwick{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${styles.center} ${styles.blue} `}
                      href="/about"
                    >
                      <strong>ABOUT US : </strong>Our Company Information
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${styles.center} ${styles.blue} `}
                      href="/ourfleet"
                    >
                      <strong>OUR FLEET : </strong>You can find info about our
                      vehicles
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      className={`${styles.center} ${styles.blue} `}
                      href="/faqs"
                    >
                      <strong>FAQs : </strong>Most asked questions
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${styles.center} ${styles.blue} `}
                      href="/terms"
                    >
                      <strong>TERMS : </strong>Booking terms and conditions
                    </a>
                  </li>
                </ul>
                <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1} ${styles.mt1}  `}
                  >
                    Heathrow to Gatwick by taxi
                  </h2>
                  <ul>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-heathrow-airport-to-gatwick-airport"
                      >
                        Heathrow to Gatwick by taxi{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-gatwick-airport-to-heathrow-airport"
                      >
                        Gatwick to Heathrow by taxi
                      </a>
                    </li>
                  </ul>
                </div>
                <p>&nbsp;</p>
                <ul>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1}`}
                  >
                    Heathrow to Gatwick SHUTTLE BUS
                  </h2>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow-to-gatwick-shuttle"
                    >
                      Heathrow to Gatwick Shuttle Bus{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/shuttle-from-gatwick-north-to-heathrow-airport"
                    >
                      Gatwick to Heathrow Shuttle Bus
                    </a>
                  </li>
                </ul>
                <p>&nbsp;</p>
                <ul>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1}`}
                  >
                    Heathrow Airport
                  </h2>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow_terminal_1_taxi"
                    >
                      Heathrow Airport Taxi Transfers: Terminal 1
                    </a>
                  </li>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow_terminal_3_taxi_transfers"
                    >
                      Heathrow Airport Taxi Transfers: Terminal 3{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow_terminal_4_taxi_transfers"
                    >
                      Heathrow Airport Taxi Transfers: Terminal 4
                    </a>
                  </li>
                  <li>
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow_terminal_5_taxi_transfers"
                    >
                      Heathrow Airport Taxi Transfers: Terminal 5{" "}
                    </a>
                  </li>
                  <li style={{ display: "none" }}>
                    <a
                      style={{
                        textDecoration: "line-through",
                        background: "rgb(26, 23, 23)",
                        display: "none",
                        color: "white",
                      }}
                      className={` ${styles.blue} ${styles.underline}`}
                      href="http://heathrow-gatwick-transfers.com/heathrow-to-oxford.aspx"
                    >
                      Heathrow Airport to Oxford
                    </a>
                  </li>
                  {/* <li>
                    {" "}
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow-to-birmingham-taxi-transport"
                    >
                      Heathrow Airport to Birmingham Taxi Transport
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow-to-brighton-taxi-transport"
                    >
                      Heathrow Airport to Brighton Taxi Transport
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className={` ${styles.blue} ${styles.underline}`}
                      href="/heathrow-to-cambridge-taxi-transport"
                    >
                      Heathrow Airport to Cambridge Taxi Transport
                    </a>
                  </li> */}
                </ul>
                {/* <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1} ${styles.mt1}`}
                  >
                    <a href="/heathrow-to-london" className={styles.blue}>
                      Heathrow to London taxi{" "}
                    </a>
                  </h2>
                  <ul>
                    <li>
                      <a
                        href="/heathrow-to-bayswater"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        Heathrow Airport to Bayswater,London Taxi Transport
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/heathrow-to-london"
                      >
                        Heathrow Airport to Oxford Street Taxi Transport
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/heathrow-to-mayfair"
                      >
                        Heathrow Airport to Mayfair,London Taxi Transport
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/heathrow-to-piccadilly"
                      >
                        Heathrow Airport to Piccadilly,London Taxi Transport{" "}
                      </a>
                    </li>
                  </ul>
                </div> */}
                {/* <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1}  ${styles.mt1}`}
                  >
                    GATWICK AIRPORT
                  </h2>
                  <ul>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/gatwick_airport_hotels_taxi_transfers"
                      >
                        Gatwick Airport Hotels Taxi Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline} `}
                        href="/gatwick_airport_north_taxi_transfers"
                      >
                        Gatwick Airport North Taxi Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/gatwick_airport_south_taxi_transfers"
                      >
                        Gatwick Airport South Taxi Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/gatwick-to-london-taxi"
                      >
                        Gatwick to London taxi transfers
                      </a>
                    </li>
                  </ul>
                </div> */}
                <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={` ${styles.blue} ${styles.mb1}  ${styles.mt1}`}
                  >
                    TRAVEL INFORMATION PAGES
                  </h2>
                  <ul>
                    <li>
                      <a
                        href="/from-gatwick-to-heathrow-transfer"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        Gatwick to Heathrow Travel info
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-heathrow-to-gatwick-travel"
                      >
                        Heathrow to Gatwick Travel info
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={`${styles.blue} ${styles.mt1} ${styles.mb1} `}
                  >
                    PROMOTION PAGES
                  </h2>

                  <ul>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-gatwick-airport-to-heathrow-airport"
                      >
                        Gatwick to Heathrow Chauffeur driven car price from
                        £49.00
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-heathrow-airport-to-gatwick-airport"
                      >
                        Heathrow to Gatwick Chauffeur driven car price from
                        £49.00
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-heathrow-airport-to-dover-cruise"
                      >
                        London Heathrow airport to from Dovercruise terminal
                        £129.00
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/from-heathrow-airport-to-southampton-cruise"
                      >
                        Heathrow Airport to/from Southampton Cruise Port £95.00
                      </a>
                    </li>
                  </ul>
                </div> */}

                <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={`${styles.blue} ${styles.mb1} ${styles.mt1}`}
                  >
                    CRUISE PORTS
                  </h2>
                  <ul>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="portsmouth_cruise_taxi_transfers"
                      >
                        Portsmouth Cruise Port Taxi Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/southampton_cruise_taxi_transfers"
                      >
                        Southampton Cruise Port Taxi Transfers
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/dover_cruise_taxi_transfers"
                      >
                        Dover Cruise Port Taxi Transfers :
                        Heathrow-gatwick-transfers.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2
                    style={{ fontSize: "24PX" }}
                    className={`${styles.blue} ${styles.mb1} ${styles.mt1}`}
                  >
                    HEATHROW GATWICK TRAVEL NEWS
                  </h2>
                  <ul>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/travel-chaos-during-the-london-olympics-2012"
                      >
                        Leading airlines warn of travel chaos during the London
                        Olympics 2012{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/gatwick-insight"
                      >
                        Gatwick Insight
                      </a>
                    </li>
                    <li>
                      <a
                        href="/ways-to-travel-from-gatwick"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        Ways to travel from Gatwick{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/lgw-flight-info"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        LGW flight info
                      </a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a
                        href="http://heathrow-gatwick-transfers.com/which-terminal.aspx"
                        style={{
                          textDecoration: "line-through",
                          background: "rgb(26, 23, 23)",
                          display: "none",
                          color: "white",
                        }}
                      >
                        Which Terminal in Heathrow. Find your flight Terminal
                      </a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a
                        style={{
                          textDecoration: "line-through",
                          background: "rgb(26, 23, 23)",
                          display: "none",
                          color: "white",
                        }}
                        href="http://heathrow-gatwick-transfers.com/long-immigration-queues-at-heathrow.aspx"
                      >
                        Heathrow Customs efecting those with connecting flight
                      </a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a
                        style={{
                          textDecoration: "line-through",
                          background: "rgb(26, 23, 23)",
                          display: "none",
                          color: "white",
                        }}
                        href="http://heathrow-gatwick-transfers.com/latest-edition-to-heathrow-terminal-5.aspx"
                      >
                        Heathrow Terminal 5: Latest info
                      </a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a
                        style={{
                          textDecoration: "line-through",
                          background: "rgb(26, 23, 23)",
                          display: "none",
                          color: "white",
                        }}
                        href="http://heathrow-gatwick-transfers.com/journey-time-between-heathrow-and-gatwick.aspx"
                      >
                        Journey time between Heathrow and Gatwick
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/how-do-i-travel-between-airports"
                      >
                        How do I travel between airports?
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/olympic-roads"
                      >
                        Dedicated Olympic lanes open as the event draws near
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/london-2012-has-arrived"
                      >
                        London 2012 has arrived, are you planning on escaping or
                        staying for the games?
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/london-2012-has-arrived"
                      >
                        Escape those travel charges
                      </a>
                    </li>
                    <li style={{ display: "none" }}>
                      <a
                        href="http://heathrow-gatwick-transfers.com/third-runway-at-heathrow-battles-on.aspx"
                        style={{
                          textDecoration: "line-through",
                          background: "rgb(26, 23, 23)",
                          display: "none",
                          color: "white",
                        }}
                      >
                        As the battle for a third runway at Heathrow battles on…
                        I’d rather watch the Paralympics!
                      </a>
                    </li>
                    <li>
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href=" /a-brand-new-airline-qualification!"
                      >
                        Aerospace Engineering Diploma a brand new airline
                        qualification!
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="/austerity-cuts-and-tax-rises-start-to-bite-hard"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        Austerity cuts and tax rises start to bite hard, but
                        isn’t it necessary for the Eurozone to survive?
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="/cut-air-tax-in-wales"
                        className={` ${styles.blue} ${styles.underline}`}
                      >
                        Cut air tax in Wales
                      </a>
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      {" "}
                      <a
                        className={` ${styles.blue} ${styles.underline}`}
                        href="/delays-worsen-at-heathrow"
                      >
                        Heathrow Delays worsen
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          HEATHROW GATWICK TRANSFERS 020 8686 2396
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
