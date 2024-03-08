import React, { useState } from "react";
import "./Orders.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Queue from "./queue/Queue";
import Shipping from "./shipping/Shipping";
import Delivered from "./delivered/Delivered";

const Orders = () => {
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="master-order-box">
      <div className="order-buttons-box">
        <button
          className="queue-button"
          style={
            index === 1 ? { backgroundColor: "blueviolet", color: "white" } : {}
          }
          onClick={() => {
            setIndex(1);
            navigate("");
          }}
        >
          Очередь
        </button>
        <button
          onClick={() => {
            setIndex(2);
            navigate("shipping");
          }}
          className="shipping-button"
          style={
            index === 2 ? { backgroundColor: "blueviolet", color: "white" } : {}
          }
        >
          В Обработке
        </button>
        <button
          onClick={() => {
            setIndex(3);
            navigate("delivered");
          }}
          className="delivered-button"
          style={
            index === 3 ? { backgroundColor: "blueviolet", color: "white" } : {}
          }
        >
          Доставлен
        </button>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Queue />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/delivered" element={<Delivered />} />
        </Routes>
      </div>
    </div>
  );
};

export default Orders;
