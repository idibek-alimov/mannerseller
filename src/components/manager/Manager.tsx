import React from "react";
import "./Manager.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import UnActive from "./unactive/UnActive";
import Active from "./active/Active";
import ActiveAndAvailable from "./activeAndAvailable/ActiveAndAvailable";

const Manager = () => {
  const navigate = useNavigate();
  return (
    <div className="manager-box">
      <div>All products</div>
      <div className="manager-nav-button-box">
        <button className="left" onClick={() => navigate("/manager")}>
          Неактивные
        </button>
        <button className="right" onClick={() => navigate("/manager/active")}>
          Активиные
        </button>
        <button
          className="right"
          onClick={() => navigate("/manager/active/available")}
        >
          На показ
        </button>
      </div>
      <Routes>
        <Route path="" element={<UnActive />} />
        <Route path="/active" element={<Active />} />
        <Route path="/active/available" element={<ActiveAndAvailable />} />
      </Routes>
    </div>
  );
};

export default Manager;
