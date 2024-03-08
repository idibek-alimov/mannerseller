import React, { useState, useEffect } from "react";
import "./InputWithChooseList.css";
// import { useGlobalContext } from "../CreateContext";
// import { ProductActionsKind } from "../createDispatch";
import CategoryType from "../../../extra/types/CategoryType";
import Axios, { url } from "../../../extra/axios";
import { BsChevronDown } from "react-icons/bs";
import { useGlobalContext } from "../UpdateContext";

const CategoryChooseList = () => {
  const { product, productDispatch } = useGlobalContext();
  const [category, setCategory] = useState<CategoryType>();
  const [data, setData] = useState<CategoryType[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  const axios = Axios();
  const onChangeHandler = (category: CategoryType) => {
    setCategory(category);
    if (category.name === "") {
      axios
        .get(url + "/api/v1/category")
        .then((res) => {
          console.log("categories ", res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
    //  else {
    //   axios
    //     .get(url + "/api/category/name/similar/" + )
    //     .then((res) => {
    //       setData(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  useEffect(() => {
    axios
      .get(url + "/api/v1/category")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="category-input-div">
      <div className="category-input-box">
        <input
          disabled
          onClick={() => setShow(!show)}
          className="category-input"
          value={
            product.category && product.category.description
              ? product.category.description
              : product.category?.name
          }
          onChange={(event) => {
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
      {/* <div className="category-list-div">
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
                      if (item.name) setCategory(item);
                      productDispatch({
                        type: ProductActionsKind.ADD_CATEGORY,
                        payload: item,
                      });
                      setShow(!show);
                    }}
                  >
                    <span>
                      {item.description ? item.description : item.name}
                    </span>
                  </div>
                );
              })
            : ""}
        </div>
      </div> */}
    </div>
  );
};

export default CategoryChooseList;
