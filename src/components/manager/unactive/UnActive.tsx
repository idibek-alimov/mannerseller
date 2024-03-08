import React, { useEffect, useState } from "react";
import "./UnActive.css";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";
import Axios, { url } from "../../../extra/axios";
import List from "./list/List";
import CircleM from "../../../extra/circlem/CircleM";
import { MyUnActiveContext, useUnActiveContext } from "./UnActiveContext";

const UnActive = () => {
  const [articles, setArticles] = useState<ArticleSeller[]>();
  const axios = Axios();

  useEffect(() => {
    axios
      .get(url + "/api/v1/article/manager/nonactive")
      .then((res) => {
        console.log("res from nonactive", res);
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

export default UnActive;
