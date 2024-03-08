import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../CreateContext";
import ColorChooseList from "./colorChooseList/ColorChooseList";
import "./CreateArticle.css";
import { ArticleActionsKind, PictureActionsKind } from "../createDispatch";
import ColorBox from "./colorBox/ColorBox";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import InventoryBox from "./inventoryBox/InventoryBox";
import PictureAdd from "./picture/PictureAdd";
const CreateArticle = () => {
  const {
    articles,
    articleDispatch,
    articleIndex,
    setArticleIndex,
    picturesDispatch,
  } = useGlobalContext();
  useEffect(() => {
    console.log("articles initially", articles);
  }, []);
  return (
    <div className="article-create-box">
      <div className="article-create-wrapper">
        <div className="main-text">Цвета</div>
        <div className="add-color-button-box">
          <button
            className="add-color-button"
            onClick={() => {
              console.log("articles before clicking", articles);
              articleDispatch({
                type: ArticleActionsKind.ADD_EMPTY_ARTICLE,
                payload: articles.length + 1,
              });
              picturesDispatch({
                type: PictureActionsKind.ADD_EMPTY_PICTURES,
                payload: 1,
              });
            }}
          >
            Добавить
          </button>
        </div>
        <div className="colors-wrapper">
          {articles.map((item, index) => (
            <div onClick={() => setArticleIndex(index)}>
              <ColorBox index={index} />
            </div>
          ))}
        </div>
        <div className="article-item-wrapper">
          <div className="name">Цвет</div>
          <ColorChooseList articleIndex={articleIndex} />
        </div>
        <div className="article-item-wrapper">
          <div className="name">Цена</div>
          <input
            className="price-input"
            value={
              articles[articleIndex].price !== 0
                ? articles[articleIndex].price
                : ""
            }
            type="number"
            onChange={(event) => {
              articleDispatch({
                type: ArticleActionsKind.ADD_PRICE,
                payload: { index: articleIndex, value: event.target.value },
              });
            }}
          />
        </div>
        <div className="article-item-wrapper">
          <div className="name">Скидка</div>
          <input
            className="price-input"
            value={
              articles[articleIndex].discount
                ? articles[articleIndex].discount
                : ""
            }
            type="number"
            onChange={(event) => {
              articleDispatch({
                type: ArticleActionsKind.ADD_DISCOUNT,
                payload: { index: articleIndex, value: event.target.value },
              });
            }}
          />
        </div>
        <div className="article-item-wrapper">
          <div className="name">Размер</div>
          <div className="inventory-box">
            {articles[articleIndex].inventories.length !== 0
              ? articles[articleIndex].inventories.map(
                  (item, inventoryIndex) => (
                    // <div className="inventory-item-box">
                    //   <input
                    //     key={inventoryIndex}
                    //     className="price-input"
                    //     value={item.size ? item.size : ""}
                    //     type="string"
                    //     onChange={(event) => {
                    //       articleDispatch({
                    //         type: ArticleActionsKind.ADD_SIZE,
                    //         payload: {
                    //           articleIndex: articleIndex,
                    //           string_value: event.target.value,
                    //           inventoryIndex: inventoryIndex,
                    //         },
                    //       });
                    //     }}
                    //   />
                    //   {articles[articleIndex].inventories.length > 1 ? (
                    //     <div
                    //       className="delete-icon-box"
                    //       onClick={() => {
                    //         articleDispatch({
                    //           type: ArticleActionsKind.REMOVE_INVENTORY,
                    //           payload: {
                    //             articleIndex: articleIndex,
                    //             inventoryIndex: inventoryIndex,
                    //           },
                    //         });
                    //       }}
                    //     >
                    //       <AiOutlineDelete className="delete-icon" />
                    //     </div>
                    //   ) : (
                    //     ""
                    //   )}
                    // </div>
                    <InventoryBox
                      inventory={item}
                      inventoryIndex={inventoryIndex}
                      key={inventoryIndex}
                    />
                  )
                )
              : ""}
            <div
              className="add-inventory-box"
              onClick={() => {
                articleDispatch({
                  type: ArticleActionsKind.ADD_EMPTY_INVENTORY,
                  payload: articleIndex,
                });
              }}
            >
              <AiOutlinePlus />
              <div>Добавить размер</div>
            </div>
          </div>
        </div>
        <PictureAdd />
      </div>
    </div>
  );
};

export default CreateArticle;
