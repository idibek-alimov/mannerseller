import CategoryType from "./CategoryType";

export interface ProductCreateType {
  name: string;
  description: string;
  category: CategoryType;
}
export const emptyProductCreate: ProductCreateType = {
  name: "",
  description: "",
  category: { id: 0, name: "", description: "" },
};
