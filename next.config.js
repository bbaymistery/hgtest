module.exports = {

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    });

    return config;
  },
  env: {
    mapApiKey: "AIzaSyDulwIwncfuxBve8MKXPIIPmPLRve6ySw8",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-S02J90JMSB",
  },
  async redirects() {
    return [
      //! redirect for home page is started
      {
        source: "/home.aspx",
        destination: "/",
        permanent: true,
      },

      // *111111111111111111111111111111111111111111111111111
      {
        source: "/heathrow-to-birmingham-taxi-transport.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/heathrow-to-brighton-taxi-transport.aspx",
        destination: "/",
        permanent: true,
      },

      {
        source: "/heathrow-to-cambridge-taxi-transport.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/taxi/heathrow-to-london.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/london-heathrow-to-bayswater.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/taxi/heathrow-to-bayswater.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/taxi/heathrow-to-piccadilly.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/taxi/heathrow-to-mayfair.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/taxi/bayswater-to-heathrow.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/bayswater-to-heathrow.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gatwick-to-london-taxi.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/heathrow-to-london.aspx",
        destination: "/",
        permanent: true,
      },
      // !**********************************************************

      {
        source: "/adding-to-the-seven-wonders-of-the-world.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/aeroflotemerald-waterways-and-the-hyperloop!.aspx",
        destination: "/",
        permanent: true,
      },
      //!
      {
        source: "/airline-passenger-rights-is-the-eu-new-target.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/aoa-responds-to-report-published-by-cbi.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/austerity-cuts-and-tax-rises-start-to-bite-hard.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/autumn-statement-brings-bad-news-for-travellers.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/branson-challenges-walsh.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/caa-proposes-major-changes-and-brings-good-news.aspx",
        destination: "/",
        permanent: true,
      },
      ///
      {
        source: "/cut-air-tax-in-wales.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/delays-worsen-at-heathrow.aspx",
        destination: "/",
        permanent: true,
      },

      //!
      {
        source: "/dreamliner-gracing-skies-within-weeks.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/driving-in-winter.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/escape-those-travel-charges!.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/flybe-and-ryanair-agree-on-flybe-ireland.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/french-strike-and-cause-huge-travel-disruption.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gatwick-arrival-delays.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gatwick-follows-suit-with-their-own-runway-plans!.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gatwick-to-expand-with-a-new-runway.aspx",
        destination: "/",
        permanent: true,
      },

      //!
      {
        source: "/heathrow-becomes-the-airport-of-christmas-fun.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/heathrow-triumphs-at-world-airport-awards.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/heavy-snow-effecting-london-motorways.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/holiday-tax.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/its-cursed%C2%A0boeings-dreamliner-in-trouble-again.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joy-for-cunard-curse-for-carnival-triumph.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kuoni-offer-more-cruise-holidays.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/lapland-calling….aspx",
        destination: "/",
        permanent: true,
      },

      {
        source: "/london-2012-has-arrived.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/londoners-comments-on-airport-expansion.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/long-immigration-queues-at-heathrow.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mobile-phones-inflight.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/olympic-roads.aspx",
        destination: "/",
        permanent: true,
      },
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      {
        source: "/oxford-cambridge-boat-race.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/qe2-to-make-one-more-trip.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/recent-rise-in-price-of-flights.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/staff-at-iberia-strike-in-protest-against-cuts.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/strike-by-lufthansa!.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/the-christmas-exodus-has-begun.aspx",
        destination: "/",
        permanent: true,
      },

      //!
      {
        source: "/the-golden-age-of-cruising-goes-on-display.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/third-runway-at-heathrow-battles-on.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/time-to-book-your-summer-holiday-taxi.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/travel-chaos-during-the-london-olympics-2012.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uk-air-fares-under-correct-price.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/valentines-day.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/view-to-the-heathrow-crisis.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/we-remember-those-this-remembrance-sunday.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/what-a-week-for-the-travel-industry!.aspx",
        destination: "/",
        permanent: true,
      },

      ///taxi/heathrow-to-mayfair.aspx
      //

      //taxi/bayswater-to-heathrow.aspx
      ///
      //
      //? is finished

      //!navheader  is start redirecting
      {
        source: "/heathrowtogatwick.aspx",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/ourfleet.aspx",
        destination: "/ourfleet",
        permanent: true,
      },
      {
        source: "/terms.aspx",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/contactus.aspx",
        destination: "/contactus",
        permanent: true,
      },
      {
        source: "/faqs.aspx",
        destination: "/faqs",
        permanent: true,
      },
      {
        source: "/managebooking.aspx",
        destination: "/managebooking",
        permanent: true,
      },
      {
        source: "/sitemap.html",
        destination: "/sitemap",
        permanent: true,
      },
      //? navheader  finished

      //! redirection to  => from-gatwick-airport-to-heathrow-airport
      {
        source: "/from-gatwick-to-heathrow-transfer.aspx",
        destination: "/from-gatwick-airport-to-heathrow-airport",
        permanent: true,
      },
      {
        source: "/shuttle-from-gatwick-north-to-heathrow-airport.aspx",
        destination: "/from-gatwick-airport-to-heathrow-airport",
        permanent: true,
      },

      //! redirection to  => from-heathrow-airport-to-gatwick-airport
      {
        source: "/heathrow-to-gatwick-shuttle.aspx",
        destination: "/from-heathrow-airport-to-gatwick-airport",
        permanent: true,
      },
      {
        source: "/from-heathrow-to-gatwick-travel.aspx",
        destination: "/from-heathrow-airport-to-gatwick-airport",
        permanent: true,
      },

      //2ler

      {
        source: "/which-terminal.aspx",
        destination: "/which-terminal",
        permanent: true,
      },
      {
        source: "/how-do-i-travel-between-airports.aspx",
        destination: "/how-do-i-travel-between-airports",
        permanent: true,
      },
      {
        source: "/ways-to-travel-from-gatwick.aspx",
        destination: "/ways-to-travel-from-gatwick",
        permanent: true,
      },
      {
        source: "/lgw-flight-info.aspx",
        destination: "/lgw-flight-info",
        permanent: true,
      },
      {
        source: "/journey-time-between-heathrow-and-gatwick.aspx",
        destination: "/journey-time-between-heathrow-and-gatwick",
        permanent: true,
      },
      {
        source: "/gatwick-insight.aspx",
        destination: "/gatwick-insight",
        permanent: true,
      },
      {
        source: "/Privacy.aspx",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/privacy.aspx",
        destination: "/privacy",
        permanent: true,
      },
      ///
      ///
      ///lgw-flight-info.aspx
      {
        source: "/a-brand-new-airline-qualification!.aspx",
        destination: "/a-brand-new-airline-qualification!",
        permanent: true,
      },
      {
        source: "/austerity-cuts-and-tax-rises-start-to-bite-hard.aspx",
        destination: "/austerity-cuts-and-tax-rises-start-to-bite-hard",
        permanent: true,
      },
      {
        source: "/cut-air-tax-in-wales.aspx",
        destination: "/cut-air-tax-in-wales",
        permanent: true,
      },
      {
        source: "/delays-worsen-at-heathrow.aspx",
        destination: "/delays-worsen-at-heathrow",
        permanent: true,
      },
      {
        source: "/dover_cruise_taxi_transfers.aspx",
        destination: "/dover_cruise_taxi_transfers",
        permanent: true,
      },
      {
        source: "/from-gatwick-airport-to-heathrow-airport.aspx",
        destination: "/from-gatwick-airport-to-heathrow-airport",
        permanent: true,
      },
      {
        source: "/from-gatwick-to-heathrow-transfer.aspx",
        destination: "/from-gatwick-to-heathrow-transfer",
        permanent: true,
      },
      {
        source: "/from-heathrow-airport-to-dover-cruise.aspx",
        destination: "/from-heathrow-airport-to-dover-cruise",
        permanent: true,
      },
      {
        source: "/from-heathrow-airport-to-gatwick-airport.aspx",
        destination: "/from-heathrow-airport-to-gatwick-airport",
        permanent: true,
      },
      {
        source: "/from-heathrow-airport-to-southampton-cruise.aspx",
        destination: "/from-heathrow-airport-to-southampton-cruise",
        permanent: true,
      },
      {
        source: "/from-heathrow-to-gatwick-travel.aspx",
        destination: "/from-heathrow-to-gatwick-travel",
        permanent: true,
      },
      {
        source: "/gatwick_airport_hotels_taxi_transfers.aspx",
        destination: "/gatwick_airport_hotels_taxi_transfers",
        permanent: true,
      },
      {
        source: "/gatwick_airport_north_taxi_transfers.aspx",
        destination: "/gatwick_airport_north_taxi_transfers",
        permanent: true,
      },
      {
        source: "/gatwick_airport_south_taxi_transfers.aspx",
        destination: "/gatwick_airport_south_taxi_transfers",
        permanent: true,
      },
      {
        source: "/gatwick-insight.aspx",
        destination: "/gatwick-insight",
        permanent: true,
      },
      // {
      //   source: "/gatwick-to-london-taxi.aspx",
      //   destination: "/gatwick-to-london-taxi",
      //   permanent: true,
      // },
      {
        source: "/harwich.aspx",
        destination: "/harwich",
        permanent: true,
      },
      {
        source: "/heathrow_airport_hotels_taxi_transfers.aspx",
        destination: "/heathrow_airport_hotels_taxi_transfers",
        permanent: true,
      },
      {
        source: "/heathrow_terminal_1_taxi.aspx",
        destination: "/heathrow_terminal_1_taxi",
        permanent: true,
      },
      {
        source: "/heathrow_terminal_3_taxi_transfers.aspx",
        destination: "/heathrow_terminal_3_taxi_transfers",
        permanent: true,
      },
      {
        source: "/heathrow_terminal_4_taxi_transfers.aspx",
        destination: "/heathrow_terminal_4_taxi_transfers",
        permanent: true,
      },
      {
        source: "/heathrow_terminal_5_taxi_transfers.aspx",
        destination: "/heathrow_terminal_5_taxi_transfers",
        permanent: true,
      },
      {
        source: "/heathrow-to-bayswater.aspx",
        destination: "/heathrow-to-bayswater",
        permanent: true,
      },
      {
        source: "/heathrow-to-mayfair.aspx",
        destination: "/heathrow-to-mayfair",
        permanent: true,
      },

      {
        source: "/heathrow-to-piccadilly.aspx",
        destination: "/heathrow-to-piccadilly",
        permanent: true,
      },
      {
        source: "/how-do-i-travel-between-airports.aspx",
        destination: "/how-do-i-travel-between-airports",
        permanent: true,
      },
      {
        source: "/journey-time-between-heathrow-and-gatwick.aspx",
        destination: "/journey-time-between-heathrow-and-gatwick",
        permanent: true,
      },
      {
        source: "/latest-edition-to-heathrow-terminal-5.aspx",
        destination: "/latest-edition-to-heathrow-terminal-5",
        permanent: true,
      },
      {
        source: "/portsmouth_cruise_taxi_transfers.aspx",
        destination: "/portsmouth_cruise_taxi_transfers",
        permanent: true,
      },

      {
        source: "/southampton_cruise_taxi_transfers.aspx",
        destination: "/southampton_cruise_taxi_transfers",
        permanent: true,
      },
      {
        source: "/.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/.aspx",
        destination: "/",
        permanent: true,
      },
      {
        source: "/london-heathrow-to-bayswater",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-bayswater",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-mayfair",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-piccadilly",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-london",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },

      {
        source: "/gatwick-to-london-taxi",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },

      {
        source: "/gatwick_airport_hotels_taxi_transfers",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/gatwick_airport_north_taxi_transfers",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/gatwick_airport_south_taxi_transfers",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-birmingham-taxi-transport",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-brighton-taxi-transport",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      {
        source: "/heathrow-to-cambridge-taxi-transport",
        destination: "https://www.heathrow-gatwick-transfers.com",
        permanent: true,
      },
      ///heathrow-to-cambridge-taxi-transport
    ];
  },
  // cache contorl
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|jpeg|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000,immutable',
          }
        ],
      },
    ]
  },
};
