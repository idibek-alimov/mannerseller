import React, { useEffect, useState } from "react";
import "./Active.css";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";
import Axios, { url } from "../../../extra/axios";
import { MyUnActiveContext } from "./ActiveContext";
import CircleM from "../../../extra/circlem/CircleM";
import List from "./list/List";

const Active = () => {
  const [articles, setArticles] = useState<ArticleSeller[]>();
  const axios = Axios();

  useEffect(() => {
    axios
      .get(url + "/api/v1/article/manager/active")
      .then((res) => {
        console.log("response from active", res);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MyUnActiveContext.Provider
      value={{ setArticles: setArticles, articles: articles }}
    >
      <div>{articles ? <List articles={articles} /> : <CircleM />}</div>
    </MyUnActiveContext.Provider>
  );
};

export default Active;
