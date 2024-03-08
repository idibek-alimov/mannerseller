import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Top from "./components/01top/Top";
import Nav from "./components/nav/Nav";

function App() {
  useEffect(() => {
    axios
      .get(
        "https://mannerapi.onrender.com/api/v1/user/username/available/jonibek"
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Top />
      <Nav />
    </div>
  );
}

export default App;
