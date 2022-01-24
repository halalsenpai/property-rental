import { Col, Divider, Layout, Row, Select, Slider } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import { MapComponent } from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { Card } from "../../uiComponents/Card/Card";
import "./_propertySearch.scss";

export const PropertySearch = () => {
  return (
    <div className="app-container">
      <Row className="">
        <Col className="" span={12}>
          {/* <Filter /> */}
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

      {/* <Row gutter={[16, 16]} wrap>
        <Col span={12} sm={24} md={12} lg={8}>
          <Card title={"Commercial to Residential"} description={"List Price: $250,000"} />
        </Col>
        <Col span={12} sm={24} md={12} lg={8}>
          <Card title={"Commercial to Residential"} description={"List Price: $250,000"} />
        </Col>
        <Col span={16} sm={24} md={12} lg={8}>
          <Card title={"Commercial to Residential"} description={"List Price: $250,000"} />
        </Col>
        <Col span={16} sm={24} md={12} lg={8}>
          <Card title={"Commercial to Residential"} description={"List Price: $250,000"} />
        </Col>
      </Row> */}
    </div>
  );
};
