import React from "react";
//import "./ListItem.css";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { ArticleSeller } from "../../../../../extra/types/ArticleSeller";
import axios from "axios";
import Axios, { url } from "../../../../../extra/axios";
import { ArticleOrder } from "../../../../../extra/types/ArticleOrder";
import { useQueueContext } from "../../QueueContext";
const ListItem = (article: ArticleOrder) => {
  let navigate = useNavigate();
  const axios = Axios();
  const { setArticles, articles } = useQueueContext();
  const onApproveHandle = (article: ArticleOrder) => {
    if (articles && articles.length > 0)
      axios
        .get(url + `/api/v1/order/item/change/status/${article.itemId}/${1}`)
        .then((res) => {
          let plc = articles.filter((item) => item.itemId != article.itemId);
          setArticles(plc);
          console.log(res);
        })
        .catch((err) => console.log(err));
  };
  return (
    <>
      {article ? (
        <tr className="item-card-box">
          {/* <th className="item-card-img"></th>
            
            <th className="item-card-name">Название</th>
            <th className="item-card-size">Размер</th>
            <th className="item-card-quantity">Количество</th>
            <th className="item-card-price">Цена</th>
            <th className="item-card-address">Адрес</th> */}
          <th className="item-card-img">
            <img src="./logo1.png" />
          </th>
          <th className="item-card-name">{article.name}</th>
          <th className="item-card-size">{article.size}</th>
          <th className="item-card-quantity">{article.quantity}</th>
          <th className="item-card-price">{article.price}</th>
          <th className="item-card-address">{article.address}</th>
          {/* <td className="item-card-id">{article.id}</td> */}
          <td className="edit-box" onClick={() => onApproveHandle(article)}>
            <div>
              <AiOutlineCheck className="item-icon" />
            </div>
          </td>
          {/* <td className="delete-box">
            <div
              onClick={() => {
                "starting to delete";
              }}
            >
              <AiOutlineDelete className="item-icon" style={{ color: "red" }} />
            </div>
          </td> */}
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

export default ListItem;
