import React from "react";
import InventoryCreateType from "../../../../extra/types/InventoryCreate";
import { AiOutlineDelete } from "react-icons/ai";
import { useGlobalContext } from "../../UpdateContext";
import { ArticleActionsKind } from "../../udpateDispatch";

interface InventoryBoxProp {
  inventory: InventoryCreateType;
  inventoryIndex: number;
}
const InventoryBox = ({ inventory, inventoryIndex }: InventoryBoxProp) => {
  let { articleIndex, articleDispatch, articles } = useGlobalContext();
  return (
    <div className="inventory-item-box">
      <input
        key={inventoryIndex}
        className="price-input"
        value={inventory && inventory.size ? inventory.size : ""}
        type="string"
        onChange={(event) => {
          articleDispatch({
            type: ArticleActionsKind.ADD_SIZE,
            payload: {
              articleIndex: articleIndex,
              string_value: event.target.value,
              inventoryIndex: inventoryIndex,
            },
          });
        }}
      />
      {articles[articleIndex] &&
      articles[articleIndex].inventories.length > 1 ? (
        <div
          className="delete-icon-box"
          onClick={() => {
            articleDispatch({
              type: ArticleActionsKind.REMOVE_INVENTORY,
              payload: {
                articleIndex: articleIndex,
                inventoryIndex: inventoryIndex,
              },
            });
          }}
        >
          <AiOutlineDelete className="delete-icon" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InventoryBox;
