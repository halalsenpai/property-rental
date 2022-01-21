import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { getPropertyTypes } from "../../pages/PropertySearch/service";

const { Option } = Select;

export const Filter = () => {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    const response = getPropertyTypes().then((res) => {
      console.log("response", res);
    });
    console.log(response);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Customize search parameters</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Form layout="vertical" className="row g-3">
          <div className="col-sm-6">
            <Form.Item label={"Categories"} name="categories">
              <Select defaultValue="lucy" style={{ width: "100%" }} onChange={handleChange}>
                <Option value="for-sale">For Sale</Option>
                <Option value="to-rent">To Rent</Option>
                <Option value="for-sale-and-rent">For Sale And Rent</Option>
                <Option value="Commercial To Rent">Commercial For Sale</Option>
                <Option value="Commercial To Rent">Commercial To Rent</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item label={"Property Types"} name="propertyTypes">
              <Select mode="multiple" style={{ width: "100%" }} onChange={handleChange}>
                <Option value="for-sale">For Sale</Option>
                <Option value="to-rent">To Rent</Option>
                <Option value="for-sale-and-rent">For Sale And Rent</Option>
                <Option value="Commercial To Rent">Commercial For Sale</Option>
                <Option value="Commercial To Rent">Commercial To Rent</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
