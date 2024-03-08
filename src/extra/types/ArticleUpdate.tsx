import ColorType from "./ColorType";
import InventoryCreateType, { emptyInventoryCreate } from "./InventoryCreate";

export default interface ArticleUpdateType {
  id?: number;
  product: number;
  color: ColorType;
  price: number;
  discount?: number;
  inventories: InventoryCreateType[];
  pictures?: string[];
  mainPic?: string;
}
export const emptyArticleUpdate: ArticleUpdateType = {
  product: 0,
  color: { id: 0, name: "" },
  price: 0,
  inventories: [{ size: "" }],
};
