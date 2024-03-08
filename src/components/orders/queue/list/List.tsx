import React from "react";
import "./List.css";
import ListItem from "./listItem/ListItem";
import { ArticleSeller } from "../../../../extra/types/ArticleSeller";
import { ArticleOrder } from "../../../../extra/types/ArticleOrder";
interface ListProp {
  articles: ArticleOrder[];
}
const List = ({ articles }: ListProp) => {
  return (
    <div className="item-list-box">
      <table className="item-list-info">
        <thead>
          <tr className="item-card-x">
            <th className="item-card-img"></th>

            <th className="item-card-name">Название</th>
            <th className="item-card-size">Размер</th>
            <th className="item-card-quantity">Количество</th>
            <th className="item-card-price">Цена</th>
            <th className="item-card-address">Адрес</th>

            {/* <th className="item-card-inventories">Размеры</th> */}
            <th className="item-card-edit"></th>
            {/* <th className="item-card-delete"></th> */}
          </tr>
        </thead>
        <tbody className="item-list-body">
          {articles.length !== 0
            ? articles.map((article, index) => {
                return <ListItem {...article} />;
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default List;
