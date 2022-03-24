import React, { useEffect, useState } from "react";
import { Form, Select, Row, Col, Slider, InputNumber, Switch, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { clearPropertyList, selectKeywordsRulesList, selectPropertyLoading, selectPropertyTypes, selectSortBy, selectStatus } from "../../pages/PropertySearch/slice";
import { cleanObject, jsonToQueryString } from "../../helpers/helpers";
import * as queryString from "query-string";
import { getProperties } from "../../pages/PropertySearch/thunk";
import { useForm } from "antd/lib/form/Form";

const { Option } = Select;

export const Filter = ({ setActivePanel, setPayloadPropSearch, setPropertyList }) => {
  const [category, setCategory] = useState(null);
  const [timeOnMarket, setTimeOnMarket] = useState([0, 0]);
  const [includeTagsList, setIncludeTagsList] = useState([]);
  const [excludeTagsList, setExcludeTagsList] = useState([]);

  const dispatch = useAppDispatch();
  const [form] = useForm();

  const propertyTypes = useAppSelector(selectPropertyTypes);
  const keywordsRulesList = useAppSelector(selectKeywordsRulesList);
  const sortBy = useAppSelector(selectSortBy);
  const isPropLoading = useAppSelector(selectPropertyLoading);

  useEffect(() => {
    console.log(includeTagsList);
  }, [includeTagsList]);

  const handleChange = (setState) => (value) => {
    setState(value);
  };
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  function onValuesChange(changedValues, allValues) {
    console.log("form value change", allValues);
    allValues.category && setCategory(allValues.category);
  }
  const handleFormSubmit = (values) => {
    dispatch(clearPropertyList());
    setPropertyList([]);
    if (sortBy) {
      values.sorting = sortBy;
    }
    console.log("the values", values);
    let payload = cleanObject(values);
    payload.limit = 20;
    delete payload.reduced;
    payload.reduced_max = 100;
    payload.time_on_market_min = timeOnMarket[0];
    payload.time_on_market_max = timeOnMarket[1];
    const _payload = queryString.stringify(payload);
    // setActivePanel(null);

    setPayloadPropSearch(payload);
    dispatch(getProperties({ params: _payload }));
  };
  function formatter(value) {
    if (value == 13) {
      return `∞`;
    } else {
      return value;
    }
  }

  useEffect(() => {
    if (sortBy) {
      form.submit();
    }
  }, [sortBy]);

  return (
    <div className="">
      <div className="card-body">
        <h5 className="card-title">Customise search parameters</h5>
        <p className="card-text"></p>
        <Form
          form={form}
          initialValues={{
            reduced: false,
            for_sale_and_rent: false,
            full_addrs_only: false,
            resale: false,
            sold_agreed: false,
            only_multiple_agents_similar: false,
            leasehold: false,
          }}
          name="filter"
          onValuesChange={onValuesChange}
          onFinish={handleFormSubmit}
          layout="vertical"
          className="row g-3">
          <Row gutter={[16, 10]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12}>
              <Form.Item label={"Categories"} name="category">
                <Select placeholder={"Select property category"} style={{ width: "100%" }} onChange={handleChange}>
                  <Option value="property-for-sale">Residential Sale</Option>
                  <Option value="property-to-rent">Residential Rent</Option>
                  <Option value="commercial-property-for-sale">Commercial Sale</Option>
                  <Option value="commercial-property-to-rent">Commercial Rent</Option>
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

            <Col span={8} xs={24} sm={12} md={8} lg={12}>
              <Form.Item label={"Rooms"} name="bedroom">
                <Select
                  disabled={!["property-for-sale", "property-to-rent"].includes(category)}
                  placeholder={"Select number of rooms"}
                  style={{ width: "100%" }}
                  onChange={handleChange}>
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
                  tipFormatter={formatter}
                  disabled={!["property-for-sale", "property-to-rent"].includes(category)}
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
                  disabled={!["property-for-sale", "property-to-rent"].includes(category)}
                  min={0}
                  max={timeOnMarket[1]}
                  style={{ margin: "0 16px" }}
                  value={timeOnMarket[0]}
                  onChange={(v) => {
                    setTimeOnMarket([v, timeOnMarket[1]]);
                  }}
                />
                <InputNumber
                  formatter={formatter}
                  disabled={!["property-for-sale", "property-to-rent"].includes(category)}
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
            {/* </Row> */}
            {/* <Row gutter={[16, 10]}> */}
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item valuePropName="checked" name={"reduced"} label="Reduced">
                <Switch disabled={!["property-for-sale", "property-to-rent"].includes(category)} defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item valuePropName="checked" name={"for_sale_and_rent"} label="For Sale & Rent">
                <Switch disabled={!["property-for-sale", "property-to-rent"].includes(category)} defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item name={"only_multiple_agents_similar"} valuePropName="checked" label="Multiple Agents">
                <Switch disabled={!["property-for-sale", "property-to-rent"].includes(category)} defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item valuePropName="checked" name={"full_addrs_only"} label="Full Address">
                <Switch disabled={!["property-for-sale", "property-to-rent"].includes(category)} defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item name={"resale"} valuePropName="checked" label="Relisted">
                <Switch defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item name={"sold_agreed"} valuePropName="checked" label="Include Sold/Let">
                <Switch defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <Form.Item name={"leasehold"} valuePropName="checked" label="Leasehold">
                <Switch disabled={!["residental_sale"].includes(category)} defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Form.Item name={"keywords"} label="Tags">
                <Select mode="multiple" style={{ width: "100%" }} placeholder="Select tags" onChange={handleChange(setIncludeTagsList)}>
                  {keywordsRulesList?.map((keyword, i) => (
                    <Option disabled={excludeTagsList.includes(keyword.keyword)} key={i} value={keyword.keyword}>
                      {keyword.keyword.replaceAll("_", " ")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Form.Item name={"keywords_exclude"} label="Tags to exclude">
                <Select mode="multiple" style={{ width: "100%" }} placeholder="Select tags to exclude" onChange={handleChange(setExcludeTagsList)}>
                  {keywordsRulesList?.map((keyword, i) => (
                    <Option disabled={includeTagsList.includes(keyword.keyword)} key={i} value={keyword.keyword}>
                      {keyword.keyword.replaceAll("_", " ")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button disabled={isPropLoading} type="button" onClick={() => form.resetFields()} className="btn btn-orange me-2">
              Clear Filter
            </button>
            <button disabled={isPropLoading} type="submit" className="btn btn-primary">
              {isPropLoading && <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>}
              Search
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
