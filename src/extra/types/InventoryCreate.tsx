export default interface InventoryCreateType {
  size: string;
  id?: number;
}
export const emptyInventoryCreate: InventoryCreateType = {
  size: "",
};
