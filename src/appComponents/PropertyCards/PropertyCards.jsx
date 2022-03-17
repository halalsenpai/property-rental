import { Col, Row } from "antd";
import React from "react";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import "./_propertyCards.scss";

export const PropertyCards = ({ listData, setSelectedProperty, selectedProperty, setPropetyCardData }) => {
  return (
    <div className="property-cards-container container">
      <Row gutter={[16, 16]} wrap>
        {listData &&
          listData.map((property, i) => (
            <Col key={i} span={24} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <PropertyCard setPropetyCardData={setPropetyCardData} selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty} propertyData={property} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
