import React, { useEffect, useState } from "react";
import { Form, Select, Row, Col, Slider, InputNumber, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getPropertyTypes } from "../../pages/PropertySearch/thunk";
import { selectPropertyTypes } from "../../pages/PropertySearch/slice";

const { Option } = Select;

export const Filter = () => {
  const [category, setCategory] = useState(null);
  const [timeOnMarket, setTimeOnMarket] = useState([0, 0]);

  const dispatch = useAppDispatch();

  const propertyTypes = useAppSelector(selectPropertyTypes);

  useEffect(() => {
    dispatch(getPropertyTypes());
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  function onValuesChange(changedValues, allValues) {
    console.log("form value change", allValues);
    allValues.category && setCategory(allValues.category);
  }

  return (
    <div className="">
      <div className="card-body">
        <h5 className="card-title">Customize search parameters</h5>
        <p className="card-text"></p>
        <Form onValuesChange={onValuesChange} layout="vertical" className="row g-3">
          <Row gutter={[16, 10]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12}>
              <Form.Item label={"Categories"} name="category">
                <Select placeholder={"Select property category"} style={{ width: "100%" }} onChange={handleChange}>
                  <Option value="residental_sale">Residential Sale</Option>
                  <Option value="residental_rent">Residential Rent</Option>
                  <Option value="commercial_sale">Commercial Sale</Option>
                  <Option value="commercial_rent">Commercial Rent</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={12} md={12} lg={12}>
              <Form.Item label={"Property Types"} name="propertyTypes">
                <Select placeholder={"Select property types"} mode="multiple" style={{ width: "100%" }} onChange={handleChange}>
                  {propertyTypes.length &&
                    propertyTypes.map((propType, i) => (
                      <Option key={i} value={propType.prop_type}>
                        {propType.prop_type}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <>
            <Row wrap gutter={[16, 10]}>
              <Col span={8} xs={24} sm={12} md={8} lg={12}>
                <Form.Item label={"Rooms"} name="bedroom">
                  <Select
                    disabled={!["residental_sale", "residental_rent"].includes(category)}
                    placeholder={"Select number of rooms"}
                    style={{ width: "100%" }}
                    onChange={handleChange}>
                    <Option value="2/3/4/5/6/7/8/9/10">2/3/4/5/6/7/8/9/10</Option>
                    <Option value="studio">Studio</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5+">5+</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} xs={24} sm={24} md={24} lg={12}>
                <Form.Item label={"Time On Market (months)"} name={"timeOnMarket"}>
                  <Slider
                    disabled={!["residental_sale", "residental_rent"].includes(category)}
                    draggableTrack
                    range
                    min={0}
                    max={13}
                    onChange={(e) => {
                      setTimeOnMarket(e);
                    }}
                    value={timeOnMarket}
                  />
                  <InputNumber
                    disabled={!["residental_sale", "residental_rent"].includes(category)}
                    min={0}
                    max={timeOnMarket[1]}
                    style={{ margin: "0 16px" }}
                    value={timeOnMarket[0]}
                    onChange={(v) => {
                      setTimeOnMarket([v, timeOnMarket[1]]);
                    }}
                  />
                  <InputNumber
                    disabled={!["residental_sale", "residental_rent"].includes(category)}
                    min={timeOnMarket[0]}
                    max={13}
                    style={{ margin: "0 16px" }}
                    value={timeOnMarket[1]}
                    onChange={(v) => {
                      setTimeOnMarket([timeOnMarket[0], v]);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 10]}>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Reduced">
                  <Switch disabled={!["residental_sale", "residental_rent"].includes(category)} defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="For Sale & Rent">
                  <Switch disabled={!["residental_sale", "residental_rent"].includes(category)} defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Multiple Agents">
                  <Switch disabled={!["residental_sale", "residental_rent"].includes(category)} defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Full Address Only">
                  <Switch disabled={!["residental_sale", "residental_rent"].includes(category)} defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Relisted">
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Include Sold/Let">
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                <Form.Item label="Leasehold">
                  <Switch disabled={!["residental_sale"].includes(category)} defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
            </Row>
          </>
        </Form>
      </div>
    </div>
  );
};
