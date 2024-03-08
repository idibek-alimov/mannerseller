import React, { useEffect, useState } from "react";
import "./Main.css";
import Axios, { url } from "../../extra/axios";
import { ArticleSeller } from "../../extra/types/ArticleSeller";
import List from "../list/List";
import CircleM from "../../extra/circlem/CircleM";
import { useNavigate } from "react-router-dom";
import { MyGlobalContext } from "./MainContext";
const Main = () => {
  const [aArticles, setAArticles] = useState<ArticleSeller[]>();
  const [uArticles, setUArticles] = useState<ArticleSeller[]>();
  const [status, setStatus] = useState<number>(0);
  let axios = Axios();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(url + "/api/v1/article/seller/available")
      .then((res) => {
        setAArticles(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(url + "/api/v1/article/seller/unavailable")
      .then((res) => {
        setUArticles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyGlobalContext.Provider value={{ status: status }}>
      <div className="main-box">
        <div className="main-wrapper">
          <div className="top">
            <button className="add-product" onClick={() => navigate("/create")}>
              Добавить
            </button>
          </div>
          <div className="main-page-nav-box">
            <div className="main-page-nav-item" onClick={() => setStatus(0)}>
              Активные
            </div>
            <div className="main-page-nav-item" onClick={() => setStatus(1)}>
              Карзина
            </div>
          </div>
          <div className="bottom">
            {aArticles ? (
              <div>
                {status === 0 && aArticles ? <List articles={aArticles} /> : ""}
                {status === 1 && uArticles ? (
                  <List articles={uArticles} />
                ) : (
                  " "
                )}
              </div>
            ) : (
              <CircleM />
            )}
          </div>
          {/* <div className="bottom">
            {status === 0 && articles[0] ? (

              <List articles={articles[0]} />
            ) : (
              <CircleM />
            )}
          </div> */}
          <div className="bottom"></div>
        </div>
      </div>
    </MyGlobalContext.Provider>
  );
};

export default Main;
