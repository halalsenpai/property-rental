import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1"> Prop App </span>
        <div>
          <Select style={{ width: "100px", height: "38px" }} placeholder="Tool">
            <Option>Prop App</Option>
          </Select>
          <button type="button" className="btn btn-danger ms-3">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
