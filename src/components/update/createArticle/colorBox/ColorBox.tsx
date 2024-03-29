import React from "react";
import "./ColorBox.css";
import { useGlobalContext } from "../../UpdateContext";
interface TextProp {
  index: number;
  // setArticleIndex: React.Dispatch<React.SetStateAction<any>>;
}
function ColorBox({ index }: TextProp) {
  const { articles, articleDispatch, articleIndex, setArticleIndex } =
    useGlobalContext();

  const onRemoveArticle = () => {
    // confirmAlert({
    //   title: "Confirm to submit",
    //   message: "Are you sure to do this.",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
    //         setArticleIndex(0);
    //         articleDispatch({
    //           type: ArticleActionsKind.REMOVE_ARTICLE,
    //           payload: { index: index, length: articles.length - 1 },
    //         });
    //         picturesDispatch({
    //           type: PictureActionsKind.REMOVE_PICTURE_LIST,
    //           payload: index,
    //         });
    //       },
    //     },
    //     {
    //       label: "No",
    //       onClick: () => {},
    //     },
    //   ],
    // });
  };

  return (
    <div
      className={
        articleIndex === index ? "color-box-div chosen" : "color-box-div"
      }
    >
      <div className="color-box-left"></div>
      <div className="color-box-right">
        <span>
          {articles[index].color?.name
            ? articles[index].color?.name
            : "color " + (index + 1)}
        </span>
        {articles.length != 1 ? (
          <img
            src={"close500.png"}
            className="delete-article-img"
            style={{ width: 20, height: 20 }}
            onClick={onRemoveArticle}
            // onClick={() => {
            //   setArticleIndex(0);
            //   articleDispatch({
            //     type: ArticleActionsKind.REMOVE_ARTICLE,
            //     payload: { index: index, length: articles.length - 1 },
            //   });
            //   picturesDispatch({
            //     type: PictureActionsKind.REMOVE_PICTURE_LIST,
            //     payload: index,
            //   });
            // }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ColorBox;
