import React from "react";
import "./ListItem.css";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Axios, { url } from "../../../extra/axios";
const ListItem = (article: ArticleSeller) => {
  let navigate = useNavigate();
  const axios = Axios();
  const onSetUnavailable = () => {
    axios
      .get(url + `/api/v1/article/seller/set/available/${article.id}/${1}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {article ? (
        <tr className="item-card-box">
          <th className="item-card-img ">
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
            onClick={() => navigate("/update/" + article.productId)}
          >
            <div>
              <MdModeEditOutline className="item-icon" />
            </div>
          </td>
          <td className="delete-box" onClick={onSetUnavailable}>
            <div
              onClick={() => {
                "starting to delete";
              }}
            >
              <AiOutlineDelete className="item-icon" style={{ color: "red" }} />
            </div>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

export default ListItem;
