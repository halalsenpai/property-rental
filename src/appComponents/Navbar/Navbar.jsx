import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Escudo</span>
        <div>
          <Select style={{ width: "100px", height: "38px" }} placeholder="Tool">
            <Option>Escudo</Option>
          </Select>
          <button type="button" className="btn btn-danger ms-3">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
