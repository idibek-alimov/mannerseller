import React from "react";
import "./Nav.css";
import { Route, Routes } from "react-router-dom";
import Create from "../create/Create";
import Register from "../auth/register/Register";
import Authenticate from "../auth/authenticate/Authenticate";
import Main from "../main/Main";
import Manager from "../manager/Manager";
import Orders from "../orders/Orders";
import UpdateWrapper from "../update/UpdateWrapper";

const Nav = () => {
  return (
    <div className="nav-box">
      <div className="nav-wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<UpdateWrapper />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/manager/*" element={<Manager />} />
          <Route path="/order/*" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
