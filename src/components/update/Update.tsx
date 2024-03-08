import React, { useReducer, useState } from "react";
import "./Update.css";
import { emptyProductCreate } from "../../extra/types/ProductCreate";
import { emptyArticleCreate } from "../../extra/types/ArticleCreate";
import axios from "axios";
import Axios, { url } from "../../extra/axios";
import { ArticleToForm } from "../../extra/helperFuncs/ArticleToForm";
import { useNavigate } from "react-router-dom";
import CircleM from "../../extra/circlem/CircleM";
import { useGlobalContext } from "./UpdateContext";
import CategoryChooseList from "./category/CategoryChooseList";
import { ProductActionsKind } from "./udpateDispatch";
import CreateArticle from "./createArticle/CreateArticle";
import ArticleUpdateType from "../../extra/types/ArticleUpdate";
import { ArticleUpdateToForm } from "../../extra/helperFuncs/ArticleUpdateToFrom";
const Update = () => {
  const navigate = useNavigate();
  let {
    articles,
    product,
    articleIndex,
    articleDispatch,
    productDispatch,
    oldPictures,
    newPictures,
    setArticleIndex,
    oldPicturesDispatch,
    picturesDispatch,
  } = useGlobalContext();
  const axios = Axios();
  const [loading, setLoading] = useState(false);
  const updateArticleToFrom = (
    id: number,
    article: ArticleUpdateType,
    mainPic?: string | File,
    oldPictures?: String[],
    newPictures?: File[]
  ) => {
    console.log("the main pic is", mainPic);
    return ArticleUpdateToForm({
      article: {
        id: article.id ? article.id : undefined,
        product: id,
        color: article.color.id,
        price: article.price,
        inventories: article.inventories,
        discount: article.discount,
      },
      newPictures: newPictures,
      oldPictures: oldPictures,
      mainPic: typeof mainPic !== "string" ? mainPic : null,
    });
  };

  const onUpdateProductHandle = () => {
    setLoading(true);
    axios
      .post(url + "/api/v1/product/seller/update", {
        id: product.id,
        category: product.category.id,
        name: product.name,
        description: product.description,
      })
      .then((res) => {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].id) {
            let mPic: File | string = "mainPic";
            let path = "/api/v1/article/seller/update";
            if (newPictures[i].length > 0) {
              path = path + "/pictures";
            }
            if (oldPictures[i].length === 0 && newPictures[i].length !== 0) {
              mPic = newPictures[i][0];
              path = path + "/main";
            }

            axios
              .post(
                url + path,
                updateArticleToFrom(
                  product.id,
                  articles[i],
                  mPic,
                  oldPictures[i],
                  newPictures[i]
                )
              )
              .then((res) => console.log(res))
              .catch((err) => {
                // alert("Ошибка попробкйте ещё раз");
                setLoading(false);
              });
          } else {
            axios
              .post(
                url + "/api/v1/article/seller/create/pictures",
                ArticleToForm({
                  article: {
                    product: res.data,
                    color: articles[i].color.id,
                    price: articles[i].price,
                    inventories: articles[i].inventories,
                    discount: articles[i].discount,
                  },
                  pictures: newPictures[i].slice(1),
                  mainPic: newPictures[i][0],
                })
              )
              .then((res) => null)
              .catch((err) => {
                alert("Ошибка попробкйте ещё раз");
                setLoading(false);
              });
          }
          console.log(res);
          setLoading(false);
          // navigate("/");
          //axios.post(url+"/api/v1/article/seller/create/pictures",ArticleToForm({article:}))
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка попробкйте ещё раз");
        setLoading(false);
      });
  };
  return (
    <div className="product-create-box">
      {loading ? <CircleM /> : ""}
      <div className="product-create-wrapper">
        <div className="product-info-part">
          <div className="product-info-main-text">Информация о продукте</div>
          <div className="product-create-item-box">
            <div className="name">Категория</div>
            <CategoryChooseList />
          </div>
          <div className="product-create-item-box">
            <div className="name">Имя</div>
            <input
              className="name-input"
              value={product.name}
              onChange={(event) => {
                productDispatch({
                  type: ProductActionsKind.ADD_NAME,
                  payload: event.target.value,
                });
              }}
            />
          </div>
          <div className="product-create-item-box">
            <div className="name">Описание</div>
            <textarea
              className="description-input"
              value={product.description}
              onChange={(event) => {
                productDispatch({
                  type: ProductActionsKind.ADD_DESCRIPTION,
                  payload: event.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="article-info-part">
          <CreateArticle />
        </div>
        <div className="article-info-part submit-product-box">
          <button
            className="submit-product-button"
            onClick={onUpdateProductHandle}
          >
            Добавить продукт
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
