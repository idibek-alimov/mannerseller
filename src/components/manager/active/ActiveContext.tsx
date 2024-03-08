import React, { createContext, useContext } from "react";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";

export type GlobalContent = {
  articles: ArticleSeller[] | undefined;
  setArticles: React.Dispatch<any>;
};

export const MyUnActiveContext = createContext<GlobalContent>({
  articles: [],
  setArticles: () => null,
});

export const useUnActiveContext = () => useContext(MyUnActiveContext);
