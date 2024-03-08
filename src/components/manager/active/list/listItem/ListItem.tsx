import React from "react";
import "./ListItem.css";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdOutlineCancel } from "react-icons/md";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { ArticleSeller } from "../../../../../extra/types/ArticleSeller";
import axios from "axios";
import Axios, { url } from "../../../../../extra/axios";
import { useUnActiveContext } from "../../ActiveContext";
const ListItem = (article: ArticleSeller) => {
  let navigate = useNavigate();
  const axios = Axios();
  const { setArticles, articles } = useUnActiveContext();
  const onDeactivateHandle = (id: number) => {
    axios
      .get(url + "/api/v1/article/manager/deactivate/" + id)
      .then((res) => {
        if (articles) {
          let plc = articles.filter((item) => item.id !== id);
          setArticles(plc);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {article ? (
        <tr className="item-card-box">
          <th className="item-card-img">
            <img src={article.mainPic} />
          </th>
          <th className="item-card-category">{article.category}</th>
          <th className="item-card-name">{article.name}</th>
          <th className="item-card-color">{article.color}</th>
          <th className="item-card-size">{"XXL"}</th>
          <th className="item-card-price">{article.price}</th>
          {/* <td className="item-card-id">{article.id}</td> */}
          <td
            className="edit-box"
            onClick={() => onDeactivateHandle(article.id)}
          >
            <div>
              <AiOutlineDelete className="item-icon" color="red" />
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
