import env from "../../resources/env";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { reservationId, email } =
        typeof req.body === "object" &&
        !Array.isArray(req.body) &&
        req.body !== null
          ? req.body
          : {};

      // check collected data
      email = typeof email === "string" ? email : "";
      reservationId = Number(reservationId) ? reservationId : 0;
      fetch(`${env.apiDomain}/api/v1/reservation/${reservationId}`)
        .then((response) => response.json())
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.passengerDetails.email === email
          ) {
            res.json({ status: 200, data: response.data });
          } else {
            res.json({ status: 403 });
          }
        });
    } catch (error) {
      res.status(200).json({ status: 400 });
    }
  } else {
    res.status(200).json({ status: 400 });
  }
}
