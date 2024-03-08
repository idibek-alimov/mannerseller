import React, { useEffect, useState } from "react";
import "./Queue.css";
import { MyQueueContext } from "./QueueContext";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import Axios, { url } from "../../../extra/axios";
import List from "./list/List";
import CircleM from "../../../extra/circlem/CircleM";
const Queue = () => {
  const [articles, setArticles] = useState<ArticleOrder[]>();
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/manager/order/queue")
      .then((res) => {
        console.log(res);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MyQueueContext.Provider
      value={{ articles: articles, setArticles: setArticles }}
    >
      {articles ? <List articles={articles} /> : <CircleM />}
    </MyQueueContext.Provider>
  );
};

export default Queue;
