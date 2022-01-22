import { Col, Row } from "antd";
import React from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import { Card } from "../../uiComponents/Card/Card";

export const PropertySearch = () => {
  return (
    <div id="app-container">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
            Filters
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
            Cards
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <Filter />
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <Row gutter={[16, 16]} wrap>
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
          </Row>
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
      </div>
    </div>
  );
};
