import axios from "axios";
import { MessageRequest } from "../types/app";

export function sendMessage(data: MessageRequest) {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEM,
    },
  };

  axios
    .post("https://api.nexmo.com/v1/messages", data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
