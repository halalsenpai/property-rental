import { Col, Divider, Layout, Row, Select, Slider, Collapse } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import MapComponent from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { Card } from "../../uiComponents/Card/Card";
import { useAppDispatch } from "../../utils/hooks";
import { getKeywordsRulesList, getProperties, getPropertyTypes } from "./thunk";
import "./_propertySearch.scss";

const { Panel } = Collapse;

export const PropertySearch = () => {
  const [activePanel, setActivePanel] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPropertyTypes());
    dispatch(getKeywordsRulesList());
  }, []);

  return (
    <div className="app-container">
      <Row className="">
        <Col className="left-container" span={12}>
          <Collapse
            activeKey={activePanel}
            onChange={(v) => {
              setActivePanel(v);
            }}>
            <Panel header={<i className="bi bi-funnel-fill text-light"></i>} key="1">
              <Filter setActivePanel={setActivePanel} />
            </Panel>
          </Collapse>
          <div className="menu-bar d-flex justify-content-end align-items-center" style={{ marginTop: "24px", paddingInline: "24px" }}>
            <Select style={{ width: "200px" }} placeholder={"Sort by"}></Select>
          </div>
          <Divider />
          <PropertyCards />
        </Col>
        <Col span={12}>
          <MapComponent></MapComponent>
        </Col>
      </Row>
    </div>
  );
};
