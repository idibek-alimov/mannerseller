import React, { useEffect, useState } from "react";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import Axios, { url } from "../../../extra/axios";
import { MyShippingContext } from "./ShippingContext";
import List from "./list/List";
import CircleM from "../../../extra/circlem/CircleM";

const Shipping = () => {
  const [articles, setArticles] = useState<ArticleOrder[]>();
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/manager/order/shipping")
      .then((res) => {
        console.log(res);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MyShippingContext.Provider
      value={{ articles: articles, setArticles: setArticles }}
    >
      {articles ? <List articles={articles} /> : <CircleM />}
    </MyShippingContext.Provider>
  );
};

export default Shipping;
