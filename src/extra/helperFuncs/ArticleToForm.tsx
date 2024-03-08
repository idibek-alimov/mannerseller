interface InventoryProp {
  //   id?: number;
  size?: string;
  //   price?: number;
  //   quantity?: number;
}
interface ArticleProp {
  product: number;
  color?: number;

  //   sellerArticle: string;
  discount?: number;
  price: number;
  inventories: InventoryProp[];
}

interface Prop {
  article: ArticleProp;
  //   oldPics?: number[];
  pictures?: File[];
  mainPic?: File;
}

export const ArticleToForm = ({ article, pictures, mainPic }: Prop) => {
  const form_data = new FormData();
  form_data.append(
    "article",
    new Blob([JSON.stringify(article)], {
      type: "application/json",
    })
  );

  //   if (oldPics != null) {
  //     form_data.append(
  //       "oldPics",
  //       new Blob([JSON.stringify(oldPics)], {
  //         type: "application/json",
  //       })
  //     );
  //   }
  if (pictures != null) {
    pictures.map((pic) => form_data.append(`pictures`, pic));
  }
  if (mainPic != null) {
    form_data.append("mainPic", mainPic);
  }
  return form_data;
};
