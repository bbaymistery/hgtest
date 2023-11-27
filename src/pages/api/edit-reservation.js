function isJSON(string) {
  try {
    let json = JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}
export default function handler(req, res) {
  if (req.method === "POST") {
    var myHeaders = new Headers();
    var requestOptions;
    let { body } = req;
    let headers = { "Content-Type": "application/json" };
    //opitons for passenger details
    if (body.comingFromPassenger) {
      requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          "user-id": 490,
          "x-auth-token": "24610b048c20464f0ca1aefbcab94c2c",
          reservation: [body.datasFromApiPassengerDetails],
        }),
      };
    }
    // console.log(
    //   JSON.stringify({
    //     "user-id": 490,
    //     "x-auth-token": "24610b048c20464f0ca1aefbcab94c2c",
    //     reservation: [body.datasFromApiPassengerDetails],
    //   })
    // )
    //options for transfer details
    if (body.comingFromTransferDetails) {
      requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          "user-id": 490,
          "x-auth-token": "24610b048c20464f0ca1aefbcab94c2c",
          reservation: [body.datasFromApiTransferDetails],
        }),
      };
    }

    fetch(
      `https://api.london-tech.com/api/v1/reservation/edit/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(requestOptions);
        console.log(response);

        if (response.status === 200) {
          response = isJSON(isJSON) ? JSON.parse(response) : response;
          res.status(201).json({ status: 201, response });
        } else {
          res.json({ status: 403 });
        }
      })
      .catch((error) => {
        console.log(error);

        res.status(400).json({ error: ["bad request", error.message] });
      });
  } else {
    res.status(200).json({ error: ["bad request"] });
  }
}
/*
//transferdetails
    console.log(
      JSON.stringify({
        "user-id": 490,
        "x-auth-token": "24610b048c20464f0ca1aefbcab94c2c",
        reservation: [body.datasFromApiTransferDetails],
      })
    );

//passenger details
        console.log(
      JSON.stringify({
        "user-id": 490,
        "x-auth-token": "24610b048c20464f0ca1aefbcab94c2c",
        reservation: [body.datasFromApiPassengerDetails],
      })
    );
*/
