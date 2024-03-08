import React, { createContext, useContext } from "react";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";
// import {
//   ProductCreateType,
//   emptyProductCreate,
// } from "../../extra/types/ProductCreate";
// import ArticleCreateType, {
//   emptyArticleCreate,
// } from "../../extra/types/ArticleCreate";

export type GlobalContent = {
  articles: ArticleSeller[] | undefined;
  // product: ProductCreateType;
  // articles: ArticleCreateType[];
  // articleIndex: number;
  // pictures: File[][];
  // setArticleIndex: React.Dispatch<any>;
  // picturesDispatch: React.Dispatch<any>;
  //   pictures: File[][];
  // productDispatch: React.Dispatch<any>;
  // articleDispatch: React.Dispatch<any>;
  setArticles: React.Dispatch<any>;
  //   picturesDispatch: React.Dispatch<any>;
};

export const MyUnActiveContext = createContext<GlobalContent>({
  // product: emptyProductCreate,
  articles: [],
  // articleIndex: 0,
  // pictures: [],

  // //   pictures: [],
  // setArticleIndex: () => null,
  // productDispatch: () => null,
  // articleDispatch: () => null,
  //picturesDispatch: () => null,
  setArticles: () => null,
  //   picturesDispatch: () => null,
});

export const useUnActiveContext = () => useContext(MyUnActiveContext);

// export type ArticleIndexContentType = {
//   articleIndex: number;
//   setArticleIndex: React.Dispatch<React.SetStateAction<any>>;
// };

// export const ArticleIndexContext = createContext<ArticleIndexContentType>({
//   articleIndex: 0,
//   setArticleIndex: () => null,
// });

// export const useArticleIndexContext = () => useContext(ArticleIndexContext);
