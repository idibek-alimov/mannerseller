import ColorType from "./ColorType";
import InventoryCreateType, { emptyInventoryCreate } from "./InventoryCreate";

export default interface ArticleCreateType {
  product: number;
  color: ColorType;
  price: number;
  discount?: number;
  inventories: InventoryCreateType[];
}
export const emptyArticleCreate: ArticleCreateType = {
  product: 0,
  color: { id: 0, name: "" },
  price: 0,
  inventories: [{ size: "" }],
};
