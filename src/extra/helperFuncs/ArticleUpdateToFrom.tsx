interface InventoryProp {
  id?: number;
  size?: string;
  //   price?: number;
  //   quantity?: number;
}
interface ArticleProp {
  id?: number;
  product: number;
  color?: number;
  discount?: number;
  price: number;
  inventories: InventoryProp[];
}

interface Prop {
  article: ArticleProp;
  newPictures?: File[];
  mainPic?: File | null;
  oldPictures?: String[];
}

export const ArticleUpdateToForm = ({
  article,
  mainPic,
  oldPictures,
  newPictures,
}: Prop) => {
  const form_data = new FormData();
  form_data.append(
    "article",
    new Blob([JSON.stringify(article)], {
      type: "application/json",
    })
  );

  if (newPictures != null && newPictures.length > 0) {
    console.log("adding new pictures=" + newPictures.length);
    newPictures.map((pic) => form_data.append(`newPictures`, pic));
  }
  if (oldPictures != null) {
    console.log("adding old pictures=" + oldPictures.length);
    form_data.append(
      "oldPictures",
      new Blob([JSON.stringify(oldPictures)], {
        type: "application/json",
      })
    );
    // oldPictures.map((pic) =>
    //   form_data.append(
    //     "oldPictures",
    //     new Blob([JSON.stringify(pic.toString())], {
    //       type: "application/json",
    //     })
    //   )
    // );
  }
  if (mainPic != null && typeof mainPic !== "string") {
    console.log("adding mainn Pic");
    form_data.append("mainPic", mainPic);
  }
  return form_data;
};
