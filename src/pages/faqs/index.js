import React, { useEffect, useRef, useState } from "react";
import Accordion from "../../components/elements/Accordion/Accordion";
import BreadCrumb from "../../components/elements/breadCrubm";
import Layout from "../../components/layouts/Layout";
import { accordionQuestion } from "../../constants/faqs";
import styles from "./styles.module.scss";
const Faqs = () => {
  const [active, setActive] = useState(null);
  const [heightEl4, setHeightEl4] = useState();
  const [heightEl5, setHeightEl5] = useState();
  const [heightEl6, setHeightEl6] = useState();
  const [heightEl7, setHeightEl7] = useState();
  const refHeight4 = useRef();
  const refHeight5 = useRef();
  const refHeight6 = useRef();
  const refHeight7 = useRef();
  const toggleState = (e) => {
    //togglus yazsak biri otomatik acg galar
    if (e === active) {
      return setActive(null);
    }
    setActive(e);
  };

  useEffect(() => {
    setHeightEl4(`${refHeight4.current.scrollHeight}px`);
    setHeightEl5(`${refHeight5.current.scrollHeight}px`);
    setHeightEl6(`${refHeight6.current.scrollHeight}px`);
    setHeightEl7(`${refHeight7.current.scrollHeight}px`);
  }, []);

  return (
    <Layout
      title="FAQS "
      keywords="Heathrow airport transfers, Heathrow airport taxi transfer, Heathrow airport taxi quote, Heathrow airport taxi, Heathrow transfer, taxi to Heathrow airport, cab to Heathrow airport. "
      description="Questions about london airport pickups"
    >
      <div className={styles.faqs_section}>
        <BreadCrumb title="Faqs" />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.content_title}>
              <h1> Frequently Asked Questions</h1>
              <div className={styles.accordions}>
                <h2 className={styles.accordions_title}>Questions</h2>
                {accordionQuestion.map((ac, i) => {
                  return (
                    <Accordion
                      title={ac.title}
                      active={active}
                      setActive={setActive}
                      toggleState={toggleState}
                      content={ac.content}
                      key={i}
                    />
                  );
                })}
                {/* //!4 */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_heading}>
                    <div
                      className={styles.accordion_heading_content}
                      onClick={() =>
                        toggleState(
                          "What if my flight lands earlier than scheduled time? What should I do if I can’t find the driver?"
                        )
                      }
                    >
                      <p className={styles.head_title}>
                        What if my flight lands earlier than scheduled time?
                        What should I do if I can’t find the driver?
                      </p>
                      <span
                        className={`${styles.headClick} ${
                          active ===
                          "What if my flight lands earlier than scheduled time? What should I do if I can’t find the driver?"
                            ? styles.turnUp
                            : ""
                        }`}
                        onClick={() =>
                          toggleState(
                            "What if my flight lands earlier than scheduled time? What should I do if I can’t find the driver?"
                          )
                        }
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      active ===
                      "What if my flight lands earlier than scheduled time? What should I do if I can’t find the driver?"
                        ? `${styles.accordion_toggle} ${styles.animated}`
                        : `${styles.accordion_toggle}`
                    }
                    style={{
                      height:
                        active ===
                        "What if my flight lands earlier than scheduled time? What should I do if I can’t find the driver?"
                          ? `${heightEl4}`
                          : "0px",
                    }}
                    ref={refHeight4}
                  >
                    <p>
                      You should phone our 7/24 office tel number:
                      <a className={styles.number} href="tel:+442086832330">
                        +44 208 683 2330
                      </a>
                      <span>or Whatsapp us</span>
                      <a
                        className={styles.number}
                        href="https://api.whatsapp.com/send?phone=+447387901028"
                      >
                        +44 73 8790 1028
                      </a>
                    </p>
                  </div>
                </div>
                {/* //!5 */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_heading}>
                    <div
                      className={styles.accordion_heading_content}
                      onClick={() =>
                        toggleState(
                          "What should I do if I can’t find the driver?"
                        )
                      }
                    >
                      <p className={styles.head_title}>
                        What should I do if I can’t find the driver?
                      </p>
                      <span
                        className={`${styles.headClick} ${
                          active ===
                          "What should I do if I can’t find the driver?"
                            ? styles.turnUp
                            : ""
                        }`}
                        onClick={() =>
                          toggleState(
                            "What should I do if I can’t find the driver?"
                          )
                        }
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      active === "What should I do if I can’t find the driver?"
                        ? `${styles.accordion_toggle} ${styles.animated}`
                        : `${styles.accordion_toggle}`
                    }
                    style={{
                      height:
                        active ===
                        "What should I do if I can’t find the driver?"
                          ? `${heightEl5}`
                          : "0px",
                    }}
                    ref={refHeight5}
                  >
                    <p>
                      First of all, check that you are located at the specified
                      meeting point. Then, you should look for the name board
                      with your name on it. If you still can’t locate the
                      driver, then please give us a call on{" "}
                      <a className={styles.number} href="tel:+442086832330">
                        +44 208 683 2330
                      </a>
                      &nbsp;or Whatsapp us{" "}
                      <a
                        className={styles.number}
                        href="https://api.whatsapp.com/send?phone=+447387901028"
                      >
                        +44 73 8790 1028
                      </a>
                      . Our member of staff should be able to help you locate
                      the driver.
                    </p>
                  </div>
                </div>
                {/* //!6 */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_heading}>
                    <div
                      className={styles.accordion_heading_content}
                      onClick={() =>
                        toggleState(
                          "Where can I find the driver at the Cruise Terminal?"
                        )
                      }
                    >
                      <p className={styles.head_title}>
                        Where can I find the driver at the Cruise Terminal?
                      </p>
                      <span
                        className={`${styles.headClick} ${
                          active ===
                          "Where can I find the driver at the Cruise Terminal?"
                            ? styles.turnUp
                            : ""
                        }`}
                        onClick={() =>
                          toggleState(
                            "Where can I find the driver at the Cruise Terminal?"
                          )
                        }
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      active ===
                      "Where can I find the driver at the Cruise Terminal?"
                        ? `${styles.accordion_toggle} ${styles.animated}`
                        : `${styles.accordion_toggle}`
                    }
                    style={{
                      height:
                        active ===
                        "Where can I find the driver at the Cruise Terminal?"
                          ? `${heightEl6}`
                          : "0px",
                    }}
                    ref={refHeight6}
                  >
                    {" "}
                    <p>
                      <strong>-Dover Cruise Terminal:</strong>&nbsp;Dover Has 2
                      terminal, Terminal 2 has only 1 exit and its easy to find
                      your driver, but Terminal 1 has 2 exit and our driver will
                      be waiting at one of the gate. If you cant find your
                      driver please call us on{" "}
                      <span className={styles.number}>+44 20 8686 2396</span>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Southampton Cruise Terminal</strong>, There are 4
                      terminals at Southampton; our driver will be waiting by
                      the cruise arrival barriers (Outside the secure area). If
                      you can’t find your driver please call
                      <span className={styles.number}>
                        +44 (0) 208 683 2330
                      </span>
                    </p>
                    <p>&nbsp;</p>
                    <ul>
                      <li>Queen Elizabeth II Terminal, berth 38/39</li>
                      <li>Mayflower Terminal, berth 106</li>
                      <li>City Terminal dock, berth 101</li>
                      <li>Ocean Terminal, berth 46</li>
                    </ul>
                  </div>
                </div>
                {/* //!7 */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_heading}>
                    <div
                      className={styles.accordion_heading_content}
                      onClick={() =>
                        toggleState("How can I find the driver at the airport?")
                      }
                    >
                      <p className={styles.head_title}>
                        How can I find the driver at the airport?
                      </p>
                      <span
                        className={`${styles.headClick} ${
                          active === "How can I find the driver at the airport?"
                            ? styles.turnUp
                            : ""
                        }`}
                        onClick={() =>
                          toggleState(
                            "How can I find the driver at the airport?"
                          )
                        }
                      >
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      active === "How can I find the driver at the airport?"
                        ? `${styles.accordion_toggle} ${styles.animated}`
                        : `${styles.accordion_toggle}`
                    }
                    style={{
                      height:
                        active === "How can I find the driver at the airport?"
                          ? `${heightEl7}`
                          : "0px",
                    }}
                    ref={refHeight7}
                  >
                    {" "}
                    <p>
                      <strong>-Heathrow Airport Terminal 1&nbsp;</strong>
                      Meeting point for international flights will be outside
                      the Costa Coffee shop, just next to the international
                      arrivals gate. For domestic flights Meeting point is front
                      of the domestic arrivals gate.*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Heathrow Airport Terminal 2&nbsp;</strong>
                      Meeting point for international flights will be front of
                      the Arrival Gate, just in front of the Currency Exchange
                      office. For Domestic flights Meeting point is front of the
                      Coffee Nero which is in front of the domestic arrivals
                      gate.*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Heathrow Airport Terminal 3&nbsp;</strong>
                      Meeting point is front of the WH Smith shop under the
                      Heathrow Terminal Welcome Board.*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Heathrow Airport Terminal 4&nbsp;</strong>
                      Meeting point is front of the Costa Coffee shop, which is
                      situated near to the arrivals gate.*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Heathrow Airport Terminal 5&nbsp;</strong>
                      Meeting point for international flights will be outside
                      the Costa Coffee shop, just opposite the international
                      arrivals gate. For domestic flights Meeting point is front
                      of the domestic arrivals gate.*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Gatwick North Terminal:&nbsp;</strong>Arrival
                      lounge *
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Gatwick South Terminal:&nbsp;</strong>walk to the
                      Airport Information desk, which is near the arrivals gate*
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Stansted Airport:</strong>&nbsp;There is only 1
                      terminal at Stansted airport and our meeting point is
                      Airport Information desk, located on the right side of
                      arrival gate.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-London City Airport&nbsp;</strong>meeting point
                      is arrival lounge,
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>-Luton Airport</strong>&nbsp;meeting point is
                      Airport Information Desk,
                    </p>
                    <p>
                      *Our drivers will be waiting for you with your name on our
                      company board by the arrival barriers (in front of the
                      arrival gates)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faqs;
