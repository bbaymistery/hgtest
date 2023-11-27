import React from "react";
import styles from "./styles.module.scss";
import Image from 'next/image'
import googleImaeReview from '../../../../public/images/review1.png'
const TestimonialLabel = () => {
  return (
    <>
      <div className={styles.testimonial}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.left}>
              <div className={styles.heading}>
                <h1 className={styles.heading_title}>
                  What our customers are saying ?
                </h1>
              </div>
            </div>
            <div className={styles.right}>
              <a
                target="_blank"
                href="https://g.co/kgs/Rg7vb8"
                className={styles.img_div}>
                {/* <img className={styles.img} src="/images/review1.png" /> */}
                <Image
                  src={googleImaeReview}
                  alt="Heathrow Gatwick Transfers Review "
                  width={270}
                  height={183}
                  sizes={"100vw"}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialLabel;
/* <div id="eKomiSeal_default"></div>
              <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
          (function () {
            eKomiIntegrationConfig = new Array({
                certId: 'A5EF3C4302F99B6'
            });
            if (typeof eKomiIntegrationConfig != "undefined") {
                for (var eKomiIntegrationLoop = 0; eKomiIntegrationLoop < eKomiIntegrationConfig
                    .length; eKomiIntegrationLoop++) {
                    var eKomiIntegrationContainer = document.createElement('script');
                    eKomiIntegrationContainer.type = 'text/javascript';
                    eKomiIntegrationContainer.defer = true;
                    eKomiIntegrationContainer.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                        "//connect.ekomi.de/integration_1661945623/" + eKomiIntegrationConfig[eKomiIntegrationLoop]
                        .certId + ".js";
                    document.getElementsByTagName("head")[0].appendChild(eKomiIntegrationContainer);
                }
            } else {
                if ('console' in window) {
                    console.error('connectEkomiIntegration - Cannot read eKomiIntegrationConfig');
                }
            }
        })();

  `,
                }}
              /> */