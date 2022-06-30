import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Sub, SubsResponseFromApi } from "./types";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);

  useEffect(() => {
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

    fetchSubs().then(mapFromApiToSubs).then(setSubs);
  }, []);

  const divRef = useRef<HTMLDivElement>(null);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((sub) => [...subs, newSub]);
    setNewSubsNumber((n) => n + 1);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>Midu subs</h1>
      <List subs={subs} />
      New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
