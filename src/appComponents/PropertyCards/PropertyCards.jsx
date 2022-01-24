import { Col, Row } from "antd";
import React from "react";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import "./_propertyCards.scss";

export const PropertyCards = () => {
  return (
    <div className="property-cards-container container">
      <Row gutter={[16, 16]} wrap>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
        <Col span={8} sm={8}>
          <PropertyCard />
        </Col>
      </Row>
    </div>
  );
};
