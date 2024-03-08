import { createContext, useContext } from "react";
import { ArticleOrder } from "../../../extra/types/ArticleOrder";
import { ArticleSeller } from "../../../extra/types/ArticleSeller";

export type GlobalContent = {
  articles?: ArticleOrder[];
  setArticles: React.Dispatch<any>;
};
export const MyDeliveredContext = createContext<GlobalContent>({
  articles: [],
  setArticles: () => null,
});

export const useDeliveredContext = () => useContext(MyDeliveredContext);
