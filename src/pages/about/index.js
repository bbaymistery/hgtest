import React from "react";
import BreadCrumb from "../../components/elements/breadCrubm";
import Layout from "../../components/layouts/Layout";
import styles from "./styles.module.scss";
const About = () => {
  return (
    <Layout title="About Us" keywords="About Us" description="About Us">
      <div className={styles.about_section}>
        <BreadCrumb title="About  Us" />
        <div className={styles.container}>
          <div className={styles.items_content}>
            <p></p>
            <p>
              HGT (Heathrow Gatwick Transfers) is London based company
              specializing in Airports and Cruise terminal transfers. We provide
              airport and seaport taxi services to or from any destination in
              the UK. Our company is licensed by PCO (Public Carriage Office)
              and mainly operates from &nbsp;Heathrow Airport, Gatwick Airport,
              Stansted Airport, Luton Airport, and London City Airport. Our
              Cruise Terminal transfer services cover all UK Cruise Terminals
              including; Dover, Portsmouth, and Southampton Cruise Terminals.
              Our priority is to give you comfortable, safety and on-time
              transfer services.
            </p>
            <div className={styles.items}>
              <div className={styles.item}>
                <p>&nbsp;</p>

                <h2>All our cars;</h2>
                <p>&nbsp;</p>
                <ul>
                  <li>
                    <p>PCO registered</p>
                  </li>
                  <li>
                    <p>Insured including passengers</p>
                  </li>
                  <li>
                    <p>Late models (Mercedes, VW)</p>
                  </li>
                  <li>
                    <p>Non-smoking</p>
                  </li>
                  <li>
                    <p>Standard AC and GPS fitted</p>
                  </li>
                </ul>
              </div>
              <div className={styles.item}>
                <p>&nbsp;</p>
                <h2>All our drivers;</h2>
                <p>&nbsp;</p>
                <ul>
                  <li>PCO licensed</li>
                  <li>Police Safety Checked</li>
                  <li>Experienced</li>
                  <li>Reliable, friendly, and helpful</li>
                  <li>On-time</li>
                </ul>
              </div>

              <div className={styles.item}>
                <p>&nbsp;</p>
                <h2>We offer;</h2>
                <p>&nbsp;</p>
                <ul>
                  <li> Fix prices with no extra cost</li>
                  <li> Meet and Greet services</li>
                  <li> Free waiting time *</li>
                  <li> Free child or infant seats</li>
                  <li> Business Class Transfers</li>
                </ul>
              </div>
            </div>
            <p>&nbsp;</p>
            <p>
              <strong>
                * up to 30 mins from your requested pickup time at the airport.
                We charge 40p per minute for any further waiting time.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
