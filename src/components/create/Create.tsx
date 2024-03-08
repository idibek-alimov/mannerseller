import React, { useReducer, useState } from "react";
import "./Create.css";
import CategoryChooseList from "./category/CategoryChooseList";
import {
  ProductActionsKind,
  articleIndexReducer,
  articleReducer,
  pictureReducer,
  productReducer,
} from "./createDispatch";
import { emptyProductCreate } from "../../extra/types/ProductCreate";
import { emptyArticleCreate } from "../../extra/types/ArticleCreate";
import { MyGlobalContext } from "./CreateContext";
import CreateArticle from "./createArticle/CreateArticle";
import axios from "axios";
import Axios, { url } from "../../extra/axios";
import { ArticleToForm } from "../../extra/helperFuncs/ArticleToForm";
import { useNavigate } from "react-router-dom";
import CircleM from "../../extra/circlem/CircleM";
const Create = () => {
  const navigate = useNavigate();
  const [product, productDispatch] = useReducer(productReducer, {
    ...emptyProductCreate,
  });
  const [articles, articleDispatch] = useReducer(articleReducer, [
    ...[{ ...emptyArticleCreate }],
  ]);
  const [pictures, picturesDispatch] = useReducer(pictureReducer, [[]]);
  const [articleIndex, setArticleIndex] = useState(0);
  const axios = Axios();
  const [loading, setLoading] = useState(false);

  const onAddProductHandle = () => {
    setLoading(true);
    axios
      .post(url + "/api/v1/product/seller/create", {
        category: product.category.id,
        name: product.name,
        description: product.description,
      })
      .then((res) => {
        for (let i = 0; i < articles.length; i++) {
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
                pictures: pictures[i].slice(1),
                mainPic: pictures[i][0],
              })
            )
            .then((res) => null)
            .catch((err) => {
              alert("Ошибка попробкйте ещё раз");
              setLoading(false);
            });
        }
        setLoading(false);
        navigate("/");
        //axios.post(url+"/api/v1/article/seller/create/pictures",ArticleToForm({article:}))
      })
      .catch((err) => {
        alert("Ошибка попробкйте ещё раз");
        setLoading(false);
      });
  };
  return (
    <MyGlobalContext.Provider
      value={{
        product,
        productDispatch,
        articles,
        articleDispatch,
        articleIndex,
        setArticleIndex,
        pictures,
        picturesDispatch,
        // pictures,
        // picturesDispatch,
      }}
    >
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
              onClick={onAddProductHandle}
            >
              Добавить продукт
            </button>
          </div>
        </div>
      </div>
    </MyGlobalContext.Provider>
  );
};

export default Create;
