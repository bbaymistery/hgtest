import React from "react";
import styles from "./styles.module.scss";
import Image from 'next/image'

const hotelsAndAirports = [
  {
    titleName: "Heathrow Terminal 1",
    linkUrl: "/heathrow_terminal_1_taxi",
    id: 1,
    imgLink: "/images/terminal1.jpg",
  },

  {
    id: 2,
    titleName: "Heathrow Terminal 4",
    linkUrl: "/heathrow_terminal_4_taxi_transfers",

    imgLink: "/images/terminal4jpg.jpg",
  },

  {
    id: 3,
    titleName: "Gatwick Airport Hotel",
    linkUrl: "/gatwick_airport_hotels_taxi_transfers",

    imgLink: "/images/gavHotel.jpg",
  },

  {
    id: 4,
    titleName: "Gatwick North Terminal",
    linkUrl: "/gatwick_airport_north_taxi_transfers",

    imgLink: "/images/northTerminal.jpg",
  },

  {
    id: 5,
    titleName: "Heathrow Terminal 5",
    linkUrl: "/heathrow_terminal_5_taxi_transfers",

    imgLink: "/images/terminal5.jpeg",
  },

  {
    id: 6,
    titleName: "London City Airport",
    linkUrl: "/",

    imgLink: "/images/londoncity.jpg",
  },

  {
    id: 7,
    titleName: "Heathrow Terminal 2",
    linkUrl: "/",

    imgLink: "/images/t2.jfif",
  },
  {
    id: 8,
    titleName: "Gatwick South Terminal",
    linkUrl: "/gatwick_airport_south_taxi_transfers",

    imgLink: "/images/south.jpg",
  },
  {
    id: 9,
    titleName: "Stansted Airport",
    linkUrl: "/",

    imgLink: "/images/stansed.jpeg",
  },
  {
    id: 10,
    titleName: "Heathrow Terminal 3",
    linkUrl: "/heathrow_terminal_3_taxi_transfers",

    imgLink: "/images/terminal3jpg.jpg",
  },

  {
    id: 11,
    titleName: "Heathrow Airport Hotel",
    linkUrl: "/heathrow_airport_hotels_taxi_transfers",

    imgLink: "/images/hHotel.jpg",
  },
  //asgidan hecne elenmedik

  {
    id: 12,
    titleName: "Luton Airport",
    linkUrl: "/",

    imgLink: "/images/luton.jfif",
  },
];
const HotelsAirports = () => {
  return (
    <div className={styles.hotelsAirport}>
      <h1 className={styles.hotelsAirport_title}>
        The best way to travel between Heathrow and Gatwick
      </h1>
      <div className={styles.container}>
        <div className={styles.content}>
          {hotelsAndAirports.map((item, i) => {
            return (
              <a
                key={i}
                href={item.linkUrl}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div key={item.id} className={styles.card}>
                  <div className={styles.img_div}>
                    {/* <img
                      src={item.imgLink}
                      alt={item.title}
                      className={styles.img_original}
                    /> */}
                    <Image
                      src={item.imgLink}
                      className={styles.img_original}
                      alt={item.titleName}
                      layout="fill"
                    />
                  </div>
                  <div className={styles.card_desc}>
                    <h2 className={styles.card_desc_title}>{item.titleName}</h2>
                    <div className={styles.card_desc_subtitle}>
                      <div className={styles.card_detail_btn_box}>
                        <div className={styles.detail_btn}>See Details</div>
                        <p className={styles.detail_arrow_icon}>
                          <i className="fa-solid fa-angle-right"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelsAirports;
