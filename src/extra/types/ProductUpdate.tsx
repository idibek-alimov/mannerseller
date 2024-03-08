import CategoryType from "./CategoryType";

export interface ProductUpdateType {
  id: number;
  name: string;
  description: string;
  category: CategoryType;
}
export const emptyProductUpdate: ProductUpdateType = {
  id: 0,
  name: "",
  description: "",
  category: { id: 0, name: "", description: "" },
};
