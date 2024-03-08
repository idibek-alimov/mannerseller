import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Axios, { url } from "../../extra/axios";
import {
  ArticleActionsKind,
  OldPicturesActionKind,
  PictureActionsKind,
  ProductActionsKind,
  articleReducer,
  oldPictureReducer,
  pictureReducer,
  productReducer,
} from "./udpateDispatch";
import { emptyProductCreate } from "../../extra/types/ProductCreate";
import { emptyArticleCreate } from "../../extra/types/ArticleCreate";
import { emptyProductUpdate } from "../../extra/types/ProductUpdate";
import ArticleUpdateType from "../../extra/types/ArticleUpdate";
import { MyGlobalContext } from "./UpdateContext";
import Update from "./Update";
import CircleM from "../../extra/circlem/CircleM";

const UpdateWrapper = () => {
  let { id } = useParams();
  const [product, productDispatch] = useReducer(productReducer, {
    ...emptyProductUpdate,
  });
  const [articles, articleDispatch] = useReducer(articleReducer, []);
  const [newPictures, picturesDispatch] = useReducer(pictureReducer, []);
  const [oldPictures, oldPicturesDispatch] = useReducer(oldPictureReducer, []);
  const [articleIndex, setArticleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/v1/product/seller/" + id)
      .then((res) =>
        productDispatch({
          type: ProductActionsKind.ADD_PRODUCT,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
    axios
      .get(url + "/api/v1/article/seller/product/" + id)
      .then((res) => {
        let items: ArticleUpdateType[] = res.data;
        console.log("articles", res.data);
        items.map((item) => {
          articleDispatch({
            type: ArticleActionsKind.ADD_ARTICLE,
            payload: {
              id: item.id ? item.id : 0,
              product: item.product,
              color: item.color,
              price: item.price,
              discount: item.discount ? item.discount : 0,
              inventories: item.inventories,
            },
          });
          let pics: string[] = [];
          if (item.mainPic) {
            pics.push(item.mainPic);
          }
          if (item.pictures) {
            pics = pics.concat(item.pictures);
          }
          oldPicturesDispatch({
            type: OldPicturesActionKind.ADD_PICTURES,
            payload: { pictures: pics },
          });
          picturesDispatch({
            type: PictureActionsKind.ADD_EMPTY_PICTURES,
            payload: 1,
          });
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyGlobalContext.Provider
      value={{
        articles,
        articleDispatch,
        product,
        productDispatch,
        articleIndex,
        newPictures,
        oldPictures,
        setArticleIndex,
        picturesDispatch,
        oldPicturesDispatch,
      }}
    >
      {loading ? <CircleM /> : <Update />}
    </MyGlobalContext.Provider>
  );
};

export default UpdateWrapper;
