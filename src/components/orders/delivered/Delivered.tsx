import React, { useEffect, useState } from "react";
import "./Delivered.css";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import Axios, { url } from "../../../extra/axios";
import { MyDeliveredContext } from "./DeliveredContext";
import List from "./list/List";
import CircleM from "../../../extra/circlem/CircleM";

const Delivered = () => {
  const [articles, setArticles] = useState<ArticleOrder[]>();
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/manager/order/delivered")
      .then((res) => {
        console.log(res);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MyDeliveredContext.Provider
      value={{ articles: articles, setArticles: setArticles }}
    >
      {articles ? <List articles={articles} /> : <CircleM />}
    </MyDeliveredContext.Provider>
  );
};

export default Delivered;
