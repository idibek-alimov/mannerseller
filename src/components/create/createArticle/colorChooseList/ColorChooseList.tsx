import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
import { useGlobalContext } from "../../CreateContext";
import { ArticleActionsKind } from "../../createDispatch";
import CategoryType from "../../../../extra/types/CategoryType";
import Axios, { url } from "../../../../extra/axios";
import { BsChevronDown } from "react-icons/bs";

interface ColorChooseListProp {
  articleIndex: number;
}

const ColorChooseList = ({ articleIndex }: ColorChooseListProp) => {
  const { articles, articleDispatch } = useGlobalContext();
  const [color, setColor] = useState<CategoryType>();
  const [data, setData] = useState<CategoryType[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();
  const onChangeHandler = (text: string) => {
    // setColor({ name: text });
    // if (text === "") {
    // } else {
    //   axios
    //     .get(url + "/api/color/name/similar/" + text)
    //     .then((res) => {
    //       console.log(res.data);
    //       setData(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  useEffect(() => {
    axios
      .get(url + "/api/v1/color/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    // if (articles[articleIndex] && articles[articleIndex].color != null) {
    //   setColor(articles[articleIndex].color);
    // }
  }, [articleIndex]);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          onClick={() => setShow(!show)}
          className="category-input"
          value={articles[articleIndex].color.name}
          onChange={(event) => {
            onChangeHandler(event.target.value);
            //func(event.target.value);
          }}
          // onBlur={() => {
          //   if (category.valid == false) {
          //     setCategory({ text: "", valid: false });
          //   }
          //   setTimeout(() => {
          //     setShow(!show);
          //   }, 200);
          // }}
        />
        {/* <img
          className={show ? "up-png" : "up-png up-png-rotated"}
          src="up.png"
          onClick={() => setShow(!show)}
        /> */}
        <BsChevronDown
          className={show ? "up-png" : "up-png up-png-rotated"}
          // src="up.png"
          onClick={() => setShow(!show)}
        />
      </div>
      <div className="category-list-div">
        <div
          className="category-list-box"
          style={show ? { display: "flex" } : { display: "none" }}
        >
          {data.length != 0
            ? data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="category-item"
                    onClick={() => {
                      // alert("fuck you");
                      let placeholder;
                      if (item.name) setColor(item);
                      articleDispatch({
                        type: ArticleActionsKind.ADD_COLOR,
                        payload: {
                          index: articleIndex,
                          colorName: item.name,
                          colorId: item.id,
                        },
                      });
                      setShow(!show);
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ColorChooseList;
