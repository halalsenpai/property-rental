import { Col, Divider, Layout, Row, Select, Slider, Collapse } from "antd";
import React, { useEffect } from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import { MapComponent } from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { Card } from "../../uiComponents/Card/Card";
import { useAppDispatch } from "../../utils/hooks";
import { getKeywordsRulesList, getPropertyTypes } from "./thunk";
import "./_propertySearch.scss";

const { Panel } = Collapse;

export const PropertySearch = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPropertyTypes());
    dispatch(getKeywordsRulesList());
  }, []);

  return (
    <div className="app-container">
      <Row className="">
        <Col className="left-container" span={12}>
          <Collapse onChange={() => {}}>
            <Panel header={<i className="bi bi-funnel-fill text-light"></i>} key="1">
              <Filter />
            </Panel>
          </Collapse>
          <div className="menu-bar d-flex justify-content-end align-items-center" style={{ marginTop: "24px", paddingInline: "24px" }}>
            <Select style={{ width: "200px" }} placeholder={"Sort by"}></Select>
          </div>
          <Divider />
          <PropertyCards />
        </Col>
        <Col span={12}>
          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxfn5nn1AZl1aVNbZyqm6FoSizrczwalw&callback=initMap&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            containerElement={<div style={{ height: `95.7vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Col>
      </Row>
    </div>
  );
};
