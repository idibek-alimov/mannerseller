import React from "react";
import "./PictureAdd.css";
import { useGlobalContext } from "../../CreateContext";
import { BsBox } from "react-icons/bs";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { FiPlus, FiTrash } from "react-icons/fi";
import { PictureActionsKind } from "../../createDispatch";

const PictureAdd = () => {
  const { pictures, picturesDispatch, articleIndex } = useGlobalContext();

  const AddPicture = () => {
    return (
      <label
        className="empty-pictures-wrapper"
        //   onChange={(event: React.FormEvent<HTMLLabelElement>) => {
        //     console.log("label", event);
        //   }}
        htmlFor={String(articleIndex)}
      >
        <FiPlus className="plus-icon" />
        <div className="bold-text">Выберите фото</div>
        <div className="secondary-text">Добавьте до 30 фото</div>
        <input
          name=""
          type="file"
          id={String(articleIndex)}
          onChange={onAddPictures}
          hidden
          multiple={true}
        />
      </label>
    );
  };

  const onAddPictures = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      for (let i = 0; i < event.currentTarget.files?.length; i++) {
        picturesDispatch({
          type: PictureActionsKind.ADD_PICTURE,
          payload: {
            articleIndex: articleIndex,
            picture: event.currentTarget.files[i],
          },
        });
      }
      console.log(pictures);
    }
  };
  return (
    <div className="picture-box">
      {pictures[articleIndex].length !== 0 ? (
        <div className="pictures-wrapper">
          {pictures[articleIndex].map((pic, index) => {
            return (
              <div className="img-box" key={index}>
                <img className="picture" src={URL.createObjectURL(pic)} />
                <FiTrash
                  className="delete-icon"
                  onClick={() => {
                    picturesDispatch({
                      type: PictureActionsKind.REMOVE_PICTURE,
                      payload: {
                        articleIndex: articleIndex,
                        pictureIndex: index,
                      },
                    });
                  }}
                />
              </div>
            );
          })}
          <div className="img-box img-box-add">
            <AddPicture />
          </div>
        </div>
      ) : (
        <AddPicture />
      )}
    </div>
  );
};

export default PictureAdd;
