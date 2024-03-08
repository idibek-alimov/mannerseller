import React, { createContext, useContext } from "react";
import {
  ProductCreateType,
  emptyProductCreate,
} from "../../extra/types/ProductCreate";
import ArticleCreateType, {
  emptyArticleCreate,
} from "../../extra/types/ArticleCreate";
import {
  ProductUpdateType,
  emptyProductUpdate,
} from "../../extra/types/ProductUpdate";
import ArticleUpdateType, {
  emptyArticleUpdate,
} from "../../extra/types/ArticleUpdate";

export type GlobalContent = {
  product: ProductUpdateType;
  articles: ArticleUpdateType[];
  articleIndex: number;

  newPictures: File[][];
  oldPictures: String[][];
  setArticleIndex: React.Dispatch<any>;
  picturesDispatch: React.Dispatch<any>;
  oldPicturesDispatch: React.Dispatch<any>;
  //   pictures: File[][];
  productDispatch: React.Dispatch<any>;
  articleDispatch: React.Dispatch<any>;
  //   picturesDispatch: React.Dispatch<any>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  product: emptyProductUpdate,
  articles: [],
  articleIndex: 0,
  oldPictures: [],
  newPictures: [],
  //   pictures: [],
  setArticleIndex: () => null,
  productDispatch: () => null,
  oldPicturesDispatch: () => null,
  articleDispatch: () => null,
  picturesDispatch: () => null,
  //   picturesDispatch: () => null,
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export type ArticleIndexContentType = {
  articleIndex: number;
  setArticleIndex: React.Dispatch<React.SetStateAction<any>>;
};

export const ArticleIndexContext = createContext<ArticleIndexContentType>({
  articleIndex: 0,
  setArticleIndex: () => null,
});

export const useArticleIndexContext = () => useContext(ArticleIndexContext);
