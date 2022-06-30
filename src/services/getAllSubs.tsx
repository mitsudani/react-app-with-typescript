import axios from "axios";
import { Sub, SubsResponseFromApi } from "../types";

export const getAllSubs = () => {
  return fetchSubs().then(mapFromApiToSubs);
};

const fetchSubs = (): Promise<SubsResponseFromApi> => {
  // Axios
  return (
    axios
      // <SubsResponseFromApi> can be added after .get instead of adding it in the function
      .get("https://apimocha.com/mitsudani/subs")
      .then((response) => response.data)
  );

  // Fetch example
  // return fetch("https://apimocha.com/mitsudani/subs").then((res) =>
  //   res.json()
  // );
};

const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
  return apiResponse.map((subFromApi) => {
    const {
      nick,
      months: subMonths,
      profileUrl: avatar,
      description,
    } = subFromApi;
    return {
      nick,
      avatar,
      subMonths,
      description,
    };
  });
};
