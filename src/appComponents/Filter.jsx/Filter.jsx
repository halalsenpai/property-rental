import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getPropertyTypes } from "../../pages/PropertySearch/thunk";
import { selectPropertyTypes } from "../../pages/PropertySearch/slice";

const { Option } = Select;

export const Filter = () => {
  const dispatch = useAppDispatch();

  const propertyTypes = useAppSelector(selectPropertyTypes);

  useEffect(() => {
    dispatch(getPropertyTypes());
  }, []);

  useEffect(() => {
    console.log(propertyTypes);
  }, [propertyTypes]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Customize search parameters</h5>
        <p className="card-text"></p>
        <Form layout="vertical" className="row g-3">
          <div className="col-sm-4">
            <Form.Item label={"Categories"} name="categories">
              <Select  style={{ width: "100%" }} onChange={handleChange}>
                <Option value="for-sale">For Sale</Option>
                <Option value="to-rent">To Rent</Option>
                <Option value="for-sale-and-rent">For Sale And Rent</Option>
                <Option value="Commercial To Rent">Commercial For Sale</Option>
                <Option value="Commercial To Rent">Commercial To Rent</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item label={"Property Types"} name="propertyTypes">
              <Select mode="multiple" style={{ width: "100%" }} onChange={handleChange}>
                {propertyTypes.length && propertyTypes.map((propType) => <Option value={propType.prop_type}>{propType.prop_type}</Option>)}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item label={"Bedrooms"} name="propertyTypes">
              <Select mode="multiple" style={{ width: "100%" }} onChange={handleChange}>
                <Option value="0">Studio</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
