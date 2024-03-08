import { Reducer } from "react";
import { ProductCreateType } from "../../extra/types/ProductCreate";
import ArticleCreateType from "../../extra/types/ArticleCreate";
import { emptyArticleCreate } from "../../extra/types/ArticleCreate";
import InventoryCreateType, {
  emptyInventoryCreate,
} from "../../extra/types/InventoryCreate";
import { ProductUpdateType } from "../../extra/types/ProductUpdate";
import CategoryType from "../../extra/types/CategoryType";
import ArticleUpdateType from "../../extra/types/ArticleUpdate";
import ColorType from "../../extra/types/ColorType";

export enum ProductActionsKind {
  ADD_CATEGORY = "ADD_CATEGORY",
  ADD_NAME = "ADD_NAME",
  ADD_DESCRIPTION = "ADD_DESCRIPTION",
  ADD_BRAND = "ADD_BRAND",
  ADD_TAGS = "ADD_TAGS",
  ADD_DIMENSIONS = "ADD_DIMENSIONS",
  ADD_WIDTH = "ADD_WIDTH",
  ADD_HEIGHT = "ADD_HEIGHT",
  ADD_LENGTH = "ADD_LENGTH",
  ADD_GENDER = "ADD_GENDER",
  ADD_PRODUCT = "ADD_PRODUCT",
}

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}
export interface ProductActionType {
  type: ProductActionsKind;
  payload:
    | string
    | number
    | object
    | { categoryId: number; categoryName: string; categoryDescription: string }
    | { name: string; description: string; id: number }
    | { name: string; description: string; id: number; category: CategoryType };
}

export const productReducer = (
  state: ProductUpdateType,
  action: ProductActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case ProductActionsKind.ADD_NAME:
      if (typeof payload === "string")
        return {
          ...state,
          name: payload,
        };
      else return state;
    case ProductActionsKind.ADD_DESCRIPTION:
      if (typeof payload === "string")
        return {
          ...state,
          description: payload,
        };
      else return state;
    case ProductActionsKind.ADD_CATEGORY:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "id" in payload &&
        "name" in payload &&
        "description" in payload
      ) {
        return {
          ...state,
          category: payload,
        };
      } else return state;

    case ProductActionsKind.ADD_PRODUCT:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "id" in payload &&
        "name" in payload &&
        "description" in payload &&
        "category" in payload
      ) {
        return {
          ...state,
          id: payload.id,
          name: payload.name,
          description: payload.description,
          category: payload.category,
        };
      } else return state;

    // case ProductActionsKind.ADD_CATEGORY:
    //   if (
    //     typeof payload === "object" &&
    //     payload !== null &&
    //     "name" in payload
    //   ) {
    //     console.log("after parsing artificially", {
    //       ...state,
    //       category: payload,
    //     });
    //     return {
    //       ...state,
    //       category: { ...payload },
    //     };
    //   } else return state;
    // case ProductActionsKind.ADD_TAGS:
    //   if (isArrayOfStrings(payload)) {
    //     console.log("after parsing artificially", {
    //       ...state,
    //       tags: payload,
    //     });
    //     return {
    //       ...state,
    //       tags: payload,
    //     };
    //   } else return state;
    // case ProductActionsKind.ADD_GENDER:
    //   if (typeof payload === "string")
    //     return {
    //       ...state,
    //       productGender: { name: payload },
    //     };
    //   else return state;
    // case ProductActionsKind.ADD_HEIGHT:
    //   if (typeof payload === "number")
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, height: payload },
    //     };
    //   else return state;
    // case ProductActionsKind.ADD_WIDTH:
    //   if (typeof payload === "number")
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, width: payload },
    //     };
    //   else return state;
    // case ProductActionsKind.ADD_LENGTH:
    //   if (typeof payload === "number")
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, length: payload },
    //     };
    //   else return state;
    default:
      return state;
  }
};

///////////////Article Article Article ////////////////////////////////////////

export enum ArticleActionsKind {
  ADD_EMPTY_ARTICLE = "ADD_EMPTY_ARTICLE",

  REMOVE_ARTICLE = "REMOVE_ARTICLE",
  REMOVE_INVENTORY = "REMOVE_INVENTORY",
  ADD_EMPTY_INVENTORY = "ADD_EMPTY_INVENTORY",
  ADD_PRICE = "ADD_PRICE",
  ADD_QUANTITY = "ADD_QUANTITY",
  ADD_SIZE = "ADD_SIZE",
  ADD_COLOR = "ADD_COLOR",
  ADD_SELLER_ARTICLE = "ADD_SELLER_ARTICLE",
  ADD_DISCOUNT = "ADD_DISCOUNT",
  ADD_ARTICLE = "ADD_ARTICLE",
}

export interface ArticleActionType {
  type: ArticleActionsKind;
  payload:
    | string
    | number
    | { index: number; value: number }
    | { index: number; colorId: number; colorName: string }
    //    |{index:number;value:number}
    // | { index: number; percentage: number }
    // | { index: number; value: string; id: number }
    | { index: number; length: number }
    // | { articleIndex: number; inventoryIndex: number; value: number }
    | { articleIndex: number; inventoryIndex: number; string_value: string }
    | {
        id: number;
        product: number;
        color: ColorType;
        price: number;
        discount: number;
        inventories: InventoryCreateType[];
      };

  // | { articleIndex: number; inventoryIndex: number };
}

export const articleReducer = (
  state: ArticleUpdateType[],
  action: ArticleActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case ArticleActionsKind.ADD_ARTICLE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "id" in payload &&
        "product" in payload &&
        "color" in payload &&
        "price" in payload &&
        "discount" in payload &&
        "inventories" in payload
      ) {
        state.push(payload);
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_COLOR:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "colorId" in payload &&
        "colorName" in payload &&
        "index" in payload
      ) {
        state[payload.index].color = {
          name: payload.colorName,
          id: payload.colorId,
        };
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_EMPTY_ARTICLE:
      if (typeof payload === "number") {
        // && payload != state.length) {
        state.push({
          product: 0,
          color: { id: 0, name: "" },
          price: 0,
          inventories: [{ size: "" }],
          // inventories: [{ ...emptyInventoryCreate }],
        });
        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_DISCOUNT:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "index" in payload
      ) {
        state[payload.index].discount = payload.value;
        return [...state];
      } else return state;

    case ArticleActionsKind.REMOVE_ARTICLE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "length" in payload &&
        "index" in payload &&
        payload.length < state.length
      ) {
        let placeholder = state;
        placeholder.splice(payload.index, 1);
        return [...placeholder];
      } else return state;
    // case ArticleActionsKind.ADD_SELLER_ARTICLE:
    //   if (
    //     typeof payload === "object" &&
    //     payload !== null &&
    //     "value" in payload &&
    //     "index" in payload
    //   ) {
    //     state[payload.index].sellerArticle = payload.value;
    //     return [...state];
    //   } else return state;
    // case ArticleActionsKind.ADD_DISCOUNT:
    //   if (
    //     typeof payload === "object" &&
    //     payload !== null &&
    //     "percentage" in payload &&
    //     "index" in payload
    //   ) {
    //     state[payload.index].discounts[0].percentage = payload.percentage;
    //     return [...state];
    //   } else return state;

    case ArticleActionsKind.ADD_PRICE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "value" in payload &&
        "index" in payload
      ) {
        state[payload.index].price = payload.value;
        return [...state];
      } else return state;
    // case ArticleActionsKind.ADD_QUANTITY:
    //   if (
    //     typeof payload === "object" &&
    //     payload !== null &&
    //     "value" in payload &&
    //     "inventoryIndex" in payload &&
    //     "articleIndex" in payload
    //   ) {
    //     state[payload.articleIndex].inventory[payload.inventoryIndex].quantity =
    //       payload.value;
    //     return [...state];
    //   } else return state;
    case ArticleActionsKind.ADD_SIZE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "string_value" in payload &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].inventories[payload.inventoryIndex].size =
          payload.string_value;

        return [...state];
      } else return state;
    case ArticleActionsKind.ADD_EMPTY_INVENTORY:
      if (typeof payload === "number") {
        state[payload].inventories.push({ size: "" });
        return [...state];
      } else return state;
    case ArticleActionsKind.REMOVE_INVENTORY:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "inventoryIndex" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].inventories.splice(
          payload.inventoryIndex,
          1
        );
        return [...state];
      } else return state;
    default:
      return state;
  }
};

export enum PictureActionsKind {
  ADD_EMPTY_PICTURES = "ADD_EMPTY_PICTURES",
  ADD_PICTURE = "ADD_PICTURE",
  REMOVE_PICTURE = "REMOVE_PICTURE",
  REMOVE_PICTURE_LIST = "REMOVE_PICTURE_LIST",
}

const isFile = (input: File) => "File" in window && input instanceof File;
export interface PictureActionType {
  type: PictureActionsKind;
  payload:
    | string
    | number
    | { index: number; value: string }
    | { index: number; length: number }
    | { articleIndex: number; picture: File }
    | { articleIndex: number; pictureIndex: number };
}
export const pictureReducer = (state: File[][], action: PictureActionType) => {
  const { type, payload } = action;
  switch (type) {
    case PictureActionsKind.ADD_EMPTY_PICTURES:
      if (typeof payload === "number") {
        state.push([]);
        return [...state];
      } else return state;
    case PictureActionsKind.ADD_PICTURE:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "picture" in payload &&
        "articleIndex" in payload
      ) {
        state[payload.articleIndex].push(payload.picture);
        return [...state];
      } else return state;
    case PictureActionsKind.REMOVE_PICTURE:
      console.log("Removing picture");
      if (
        typeof payload === "object" &&
        payload !== null &&
        "pictureIndex" in payload &&
        "articleIndex" in payload
      ) {
        console.log(
          "removing picture with article index=" +
            payload.articleIndex +
            " and picture index=" +
            payload.pictureIndex
        );
        state[payload.articleIndex].splice(payload.pictureIndex, 1);
        return [...state];
      } else return state;
    case PictureActionsKind.REMOVE_PICTURE_LIST:
      if (typeof payload === "number") {
        state.splice(payload, 1);
        return [...state];
      } else return state;
    default:
      return state;
  }
};

export enum ArticleIndexActionKind {
  CHANGE_ARTICLE_INDEX = "CHANGE_ARTICLE_INDEX",
}
export interface ArticleIndexActionType {
  type: ArticleIndexActionKind;
  payload: number;
}
export const articleIndexReducer = (
  state: 0,
  action: ArticleIndexActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case ArticleIndexActionKind.CHANGE_ARTICLE_INDEX:
      if (typeof payload === "number") {
        return payload;
      } else return state;
    default:
      return state;
  }
};

export enum OldPicturesActionKind {
  ADD_EMPTY_PICTURES = "ADD_EMPTY_PICTURES",
  ADD_PICTURES = "ADD_PICTURES",
  REMOVE_PICTURE = "REMOVE_PICTURE",
  REMOVE_PICTURE_LIST = "REMOVE_PICTURE_LIST",
}

export interface OldPictureActionType {
  type: OldPicturesActionKind;
  payload:
    | string
    | number
    | { pictures: string[] }
    | { index: number; value: string }
    | { index: number; length: number }
    | { articleIndex: number; picture: File }
    | { articleIndex: number; pictureIndex: number };
}
export const oldPictureReducer = (
  state: String[][],
  action: OldPictureActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case OldPicturesActionKind.REMOVE_PICTURE:
      console.log("removing old picture");
      if (
        typeof payload === "object" &&
        payload !== null &&
        "pictureIndex" in payload &&
        "articleIndex" in payload
      ) {
        console.log(
          "removing old picture with article index=" +
            payload.articleIndex +
            " picture index=" +
            payload.pictureIndex
        );
        state[payload.articleIndex].splice(payload.pictureIndex, 1);
        return [...state];
      } else return state;
    case OldPicturesActionKind.ADD_PICTURES:
      if (
        typeof payload === "object" &&
        payload !== null &&
        "pictures" in payload
      ) {
        state.push(payload.pictures);
        return [...state];
      } else return state;
    case OldPicturesActionKind.ADD_EMPTY_PICTURES:
      if (typeof payload === "number") {
        state.push([]);
        return [...state];
      } else return state;
    default:
      return state;
  }
};
