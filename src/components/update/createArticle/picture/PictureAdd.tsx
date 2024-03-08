import React from "react";
import "./PictureAdd.css";
import { BsBox } from "react-icons/bs";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { FiPlus, FiTrash } from "react-icons/fi";
import {
  OldPicturesActionKind,
  PictureActionsKind,
} from "../../udpateDispatch";
import { useGlobalContext } from "../../UpdateContext";

const PictureAdd = () => {
  const {
    newPictures,
    picturesDispatch,
    oldPictures,
    oldPicturesDispatch,
    articleIndex,
  } = useGlobalContext();

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
    }
  };
  return (
    <div className="picture-box">
      {/* {oldPictures[articleIndex].length !== 0 ? (
        <div className="pictures-wrapper">
          {oldPictures[articleIndex].map((pic, index) => {
            return (
              <div className="img-box" key={index}>
                <img className="picture" src={pic.toString()} />
                <FiTrash
                  className="delete-icon"
                  onClick={() => {
                    picturesDispatch({
                      type: OldPictureActionsKind.REMOVE_PICTURE,
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
        ""
      )} */}
      {(newPictures[articleIndex] && newPictures[articleIndex].length !== 0) ||
      (oldPictures[articleIndex] && oldPictures[articleIndex].length !== 0) ? (
        <div className="pictures-wrapper">
          {oldPictures[articleIndex].map((pic, index) => {
            return (
              <div className="img-box" key={index}>
                <img className="picture" src={pic.toString()} />
                <FiTrash
                  className="delete-icon"
                  onClick={() => {
                    oldPicturesDispatch({
                      type: OldPicturesActionKind.REMOVE_PICTURE,
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
          {newPictures[articleIndex].map((pic, index) => {
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
